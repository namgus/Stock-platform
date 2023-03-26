import torch
import torch.nn as nn
import numpy as np
import pandas as pd
import pickle

device = 'cuda' if torch.cuda.is_available() else 'cpu'


class LSTM(nn.Module):
    # Long Short Term Memory
    def __init__(self, input_dim, hidden_dim, num_layers):
        super(LSTM, self).__init__()
        
        self.input_dim = input_dim
        self.hidden_dim = hidden_dim
        self.num_layers = num_layers
        
        self.lstm = nn.LSTM(input_size=self.input_dim, hidden_size=self.hidden_dim, num_layers=self.num_layers, batch_first=True)
        self.fc_1 = nn.Linear(hidden_dim, 128)
        self.fc = nn.Linear(128, 1)
        self.activation = nn.Tanh() #nn.ReLU()

    def forward(self, x):
        h_0 = torch.zeros(self.num_layers, x.size(0), self.hidden_dim).to(device)
        c_0 = torch.zeros(self.num_layers, x.size(0), self.hidden_dim).to(device)
        
        ula, (h_out, _) = self.lstm(x, (h_0, c_0))
        
        h_out = h_out.view(-1, self.hidden_dim)
        
        out = self.activation(h_out)
        out = self.fc_1(out)
        out = self.activation(out)
        out = self.fc(out)
        
        return out