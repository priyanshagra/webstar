import React, { useEffect } from 'react'
<<<<<<< Updated upstream
import { useGlobalContext } from './globalcontext'
import Form from './form'
import {incomeItem} from './incomeItem'

const Income = () => {
  const {addIncome,getIncome,income} = useGlobalContext()
  return (
    <div>
      <div className="income-content">
          <div className="form-container">
            <Form/>
          </div>
          <div className="income">
<<<<<<< Updated upstream
=======
            {income.map((income) =>{
              console.log("hello")
                 const { _id, title, amount, date, category, description } = income;
                 return  <incomeItem
                 id={_id}
                 title={title}
                 description={description}
                 amount={amount} date={date}
                 category={category}
                 />          
            })}
>>>>>>> Stashed changes
          </div>
      </div>
    </div>
  )
=======
import styled from 'styled-components'
import { useGlobalContext } from './globalcontext';
import { InnerLayout } from './Layouts';
import Form from './form';
import IncomeItem from './IncomeItem';

function Income() {
    const {addIncome,incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [])
    return (
        <IncomeStyled>
            <InnerLayout>
                <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
>>>>>>> Stashed changes
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Income
