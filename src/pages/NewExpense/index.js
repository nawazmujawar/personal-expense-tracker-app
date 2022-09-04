import { ArrowForwardIcon, CalendarIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  Highlight,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
//Firebase
import { db } from "../../config/firebaseConfig/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import "./styles.css";

const { useState } = React;

const NewExpense = (props) => {
  const navigate = useNavigate();

  const [expenseTitle, setExpenseTitle] = useState("");
  const [balance, setBalance] = useState();

  const onAddNewExpenseHandler = async (event) => {
    event.preventDefault();
    console.log("Clicked on add expense");
    //This will submit new expense to firebase

    const expense = {
      expenseTitle,
      balance,
    };
    console.log("expense", expense);
    try {
      await addDoc(collection(db, "expenses"), expense);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Container maxW="md">
      <form onSubmit={onAddNewExpenseHandler}>
        <Stack
          spacing={8}
          justifyContent="center"
          height="90vh"
          alignItems="center"
        >
          <Heading as="h2" size="2xl" textAlign="center">
            <Highlight
              query="Expense"
              styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
            >
              New Expense of the month
            </Highlight>
          </Heading>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CalendarIcon color="gray.300" />}
            />
            <Input
              isRequired
              type="text"
              placeholder="Name of Expense"
              value={expenseTitle}
              onChange={(event) => setExpenseTitle(event.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MoonIcon color="gray.300" />}
            />
            <Input
              type="number"
              isRequired
              placeholder="Balance for month. for eg. 1000"
              value={balance}
              onChange={(event) => setBalance(parseInt(event.target.value))}
            />
          </InputGroup>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            type="submit"
            width="max-content"
          >
            Add Expense
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default NewExpense;
