# sip_calculator.py

import sys
import json
# import pandas as pd

def sip_calculator_monthly(amount, interest_rate, years, withdrawals=None):
    monthly_rate = interest_rate / 12 / 100
    months = years * 12
    transactions = []
    final_amount = 0
    withdrawal_index = 0
    
    for month in range(1, months + 1):
        final_amount += amount
        withdrawal_amount = 0
        if withdrawals and withdrawal_index < len(withdrawals):
           if withdrawals[withdrawal_index]['Month'] == month:
               withdrawal_amount = withdrawals[withdrawal_index]['Amount']
               final_amount -= withdrawals[withdrawal_index]['Amount']
               withdrawal_index += 1
        
        final_amount *= (1 + monthly_rate)
        transactions.append({'Month': month, 'Amount': amount, 'Final Amount': final_amount, 'Withdrawal': withdrawal_amount})
    
    total_investment = amount * months
    return final_amount, total_investment, transactions

def sip_calculator_quarterly(amount, interest_rate, years, withdrawals=None):
    quarterly_rate = interest_rate / 4 / 100
    quarters = years * 4
    transactions = []
    final_amount = 0
    increase = 1.10
    withdrawal_index = 0
    
    for quarter in range(1, quarters + 1):
        if quarter % 4 == 1 and quarter != 1:
            amount *= increase
            if amount >= 200000:
                amount = 200000
        
        final_amount += amount
        withdrawal_amount = 0
        
        if withdrawals and withdrawal_index < len(withdrawals):
           if withdrawals[withdrawal_index]['Quarter'] == quarter:
               withdrawal_amount = withdrawals[withdrawal_index]['Amount']
               final_amount -= withdrawals[withdrawal_index]['Amount']
               withdrawal_index += 1
        
        final_amount *= (1 + quarterly_rate)
        transactions.append({'Quarter': quarter, 'Amount': amount, 'Final Amount': final_amount, 'Withdrawal': withdrawal_amount})
    
    total_investment = sum([transaction['Amount'] for transaction in transactions])
    return final_amount, total_investment, transactions

def calculate_final_amount(amount, interest_rate, years, frequency='monthly', withdrawal_plans=None):
    withdrawals = json.loads(withdrawal_plans)
    monthly_wd = withdrawals.get("monthly", [])
    quarterly_wd = withdrawals.get("quarterly", [])
    
    if frequency == 'monthly':
        final_amount, total_investment, transactions = sip_calculator_monthly(amount, interest_rate, years, monthly_wd)
    elif frequency == 'quarterly':
        final_amount, total_investment, transactions = sip_calculator_quarterly(amount, interest_rate, years, quarterly_wd)
    else:
        raise ValueError("Frequency should be either 'monthly' or 'quarterly'.")
    
    returns = final_amount - total_investment
    return {"final_amount": final_amount, "total_investment": total_investment, "returns": returns}

if __name__ == "__main__":
    # Get arguments passed from Node.js
    amount = int(sys.argv[1])
    interest_rate = float(sys.argv[2])
    years = int(sys.argv[3])
    frequency = sys.argv[4]
    withdrawal_plans = sys.argv[5]
    
    result = calculate_final_amount(amount, interest_rate, years, frequency, withdrawal_plans)
    print(json.dumps(result))  # Return as JSON for Fastify to parse