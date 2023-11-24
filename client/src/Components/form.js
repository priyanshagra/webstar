import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "./globalcontext";
import Button from "./Button";
import { plus } from "./Icons";
import { useCookies } from "react-cookie";
import { FormControl, Input, useToast } from "@chakra-ui/react";
import { CryptoState } from "./CryptoContext";
import axios from "axios";

function Form() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const { getIncomes, error, setError } = useGlobalContext();
  const { currency, symbol } = CryptoState();
  const toast = useToast();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });
  const { isSwitchOn, setIsSwitchOn } = CryptoState();

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount <= 0) {
      toast({
        title: "Please fill corectly",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "auth-token": cookies.UserId,
        },
      };
      const { data1 } = await axios.post(
        `http://localhost:8000/api/transaction/add-income`,
        {
          amount: amount,
          maker: cookies.UserId,
          title: title,
          date: date,
          category: category,
          description: description,
          currency: currency,
        },
        config
      );
      toast({
        title: "Amount is added",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      getIncomes();
    } catch (error) {
      toast({
        title: "Failed to add chats",
        description: error.response.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <FormStyled  className={`rounded-lg p-2 ${
      isSwitchOn ? "hover:bg-neutral-300" : "hover:bg-gray-700"
    } sm:mx-auto sm:w-full sm:max-w-smtransition`} onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          required
          name={"title"}
          placeholder="Salary Title"
          onChange={handleInput("title")}
          className={`${isSwitchOn?"text-gray-900":"text-white"}`}

        />
      </div>
      <div className="input-control flex flex-row items-center ">
        <span className="text-gray-500 mr-2">{symbol}</span>
        <input
          value={amount}
          type="text"
          required
          name={"amount"}
          placeholder={"Enter Salary Amount"}
          onChange={handleInput("amount")}
          className={`${isSwitchOn?"text-gray-900":"text-white"}`}

        />
      </div>
      <div className="input-control">
        <input
          type="date"
          id="dob"
          name="dob"
          required
          onChange={handleInput("date")}
          className={`block ${isSwitchOn?"text-gray-900":"text-white"} w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput("category")}
          className={`${isSwitchOn?"text-gray-900":"text-white"}`}

        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investiments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={description}
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          required
          onChange={handleInput("description")}
          className={`${isSwitchOn?"text-gray-900":"text-white"}`}

        ></textarea>
      </div>
      <div className={`px-6 py-3 text-white border border-white rounded-md transition-opacity hover:opacity-75 focus:outline-none focus:shadow-outline-blue flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                  isSwitchOn
                    ? "bg-neutral-300 text-black hover:bg-neutral-400"
                    : "bg-gray-800 hover:bg-gray-700"
                } submit-btn`}>
        <Button 
          name={"Add Income"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent"}
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  }
  .input-control {
    span {
      font-family: inherit;
      font-size: inherit;
      outline: none;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: 2px solid #fff;
      background: transparent;
      resize: none;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    }
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      width: 50%;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
export default Form;
