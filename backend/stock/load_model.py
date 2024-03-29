import torch
import torch.nn as nn
import numpy as np
import pandas as pd
import pickle
import random
from .lstm import LSTM

device = 'cuda' if torch.cuda.is_available() else 'cpu'

def load_model(close_price, sentiment_analysis):
    # Load the model and scaler
    with open('stock/data/model.pt', 'rb') as f:
        checkpoint = torch.load(f, map_location=torch.device(device))
        model = LSTM(2, 128, 1)
        model.load_state_dict(checkpoint)
        model.to(device)
        model.eval()

    with open('stock/data/scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)


    # Scale the input data
    df = pd.DataFrame({'종가': [close_price]})
    df = pd.DataFrame(scaler.transform(df), columns=['종가'])

    # Create the input tensor
    data = [{'종가': df.iloc[0, 0], '감성분석':sentiment_analysis}]
    new_data = pd.DataFrame(data)
    inputs = torch.FloatTensor(new_data.values)
    inputs = inputs.view(1, 1, -1).to(device)

    # Make predictions and inverse transform
    predictions = model(inputs)

    # Convert predictions to 1D numpy array and then back to 2D
    print(predictions)
    predictions = predictions.detach().cpu().numpy()
    predictions = np.array(predictions.squeeze())
    predictions = predictions.reshape(-1, 1)

    predictions = scaler.inverse_transform(predictions)

    print(predictions)
    return predictions


def limit_stock_price(predict_price, close_price, lower_limit, upper_limit):
    # Limit stock price upper and lower
    valid_lower = close_price * lower_limit
    valid_upper = close_price * upper_limit
    result = min(max(predict_price, valid_lower), valid_upper)

    if result == valid_lower:
        result = random.uniform(valid_lower, valid_upper)
    elif result == valid_upper:
        result = random.uniform(valid_lower, valid_upper)

    return result