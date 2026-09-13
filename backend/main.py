from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

class AssessmentInput(BaseModel):
    basic_pay: float
    allowances: float
    contributes_gpf: bool
    medical_aid: float = 0
    union_dues: float = 0
    existing_debt_obligations: float = 0
    living_expenses: float = 0


def get_gross_salary(basic_pay, allowances):
    gross_salary = basic_pay + allowances
    return gross_salary

def get_chargeable_income(basic_pay, contributes_gpf):
    if contributes_gpf == True:
        chargeable_income = basic_pay - basic_pay*0.05
    else:
        chargeable_income = basic_pay
    return chargeable_income

def get_paye(chargeable_income):
    if chargeable_income <= 6480:
        if chargeable_income >= 5100:
            paye = chargeable_income*0.2 - 1020
        else:
            paye = 0
    else:
        paye = 276 + (chargeable_income-6480)*0.3
    return paye

def get_net_pay(gross_salary, paye, medical_aid, union_dues):
    net_pay = gross_salary - paye - medical_aid - union_dues
    return net_pay

def get_disposable_income(net_pay, existing_debt_obligations):
    disposable_income = net_pay - existing_debt_obligations
    return disposable_income

def get_discretionary_income(disposable_income, living_expenses):
    discretionary_income = disposable_income - living_expenses
    return discretionary_income

def get_cap_one_third(gross_salary, medical_aid, union_dues, existing_debt_obligations):
    cap_one_third = (gross_salary / 3) - medical_aid - union_dues - existing_debt_obligations
    return cap_one_third

def get_cap_tds(net_pay, existing_debt_obligations):
    cap_tds = (0.5 * net_pay) - existing_debt_obligations
    return cap_tds

def get_cap_floor(disposable_income, gross_salary):
    cap_floor = disposable_income - (gross_salary / 3)
    return cap_floor

def get_regulatory_ceiling(cap_one_third, cap_tds, cap_floor):
    regulatory_ceiling = min(cap_one_third, cap_tds, cap_floor)
    return regulatory_ceiling

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://loan-affordability-calculator.onrender.com"
        ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/assessment")
def run_assessment(input: AssessmentInput):
    gross_salary = get_gross_salary(input.basic_pay, input.allowances)
    chargeable_income = get_chargeable_income(input.basic_pay, input.contributes_gpf)
    paye = get_paye(chargeable_income)
    net_pay = get_net_pay(gross_salary, paye, input.medical_aid, input.union_dues)
    disposable_income = get_disposable_income(net_pay, input.existing_debt_obligations)
    discretionary_income = get_discretionary_income(disposable_income, input.living_expenses)
    cap_one_third = get_cap_one_third(gross_salary, input.medical_aid, input.union_dues, input.existing_debt_obligations)
    cap_tds = get_cap_tds(net_pay, input.existing_debt_obligations)
    cap_floor = get_cap_floor(disposable_income, gross_salary)
    ceiling = get_regulatory_ceiling(cap_one_third, cap_tds, cap_floor)
    max_affordable_repayment = min(discretionary_income, ceiling)

    return {
        "gross_salary": gross_salary,
        "net_pay": net_pay,
        "disposable_income": disposable_income,
        "discretionary_income": discretionary_income,
        "regulatory_ceiling": ceiling,
        "max_affordable_repayment": max_affordable_repayment,
    }
