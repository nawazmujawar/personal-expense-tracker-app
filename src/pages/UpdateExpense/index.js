import { ArrowForwardIcon, CalendarIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  Highlight,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/firebaseConfig/firebase";
import "./styles.css";

const { useState, useEffect } = React;

const UpdateExpense = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expenseTitle, setExpenseTitle] = useState("");
  const [balance, setBalance] = useState();
  const [spentAmount, setSpentAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSingleExpense() {
      const docRef = doc(db, "expenses", id);
      try {
        const doc = await getDoc(docRef);
        const data = doc.data();
        setExpenseTitle(data.expenseTitle);
        setBalance(data.balance);
      } catch (e) {
        alert(e);
      }
    }
    fetchSingleExpense();
  }, []);

  const availableBalance =
    balance - (spentAmount === undefined ? 0 : spentAmount);

  const onUpdateExpenseHandler = async (event) => {
    event.preventDefault();
    const docRef = doc(db, "expenses", id);
    const updatedData = {
      expenseTitle,
      balance: availableBalance,
    };
    try {
      await updateDoc(docRef, updatedData);
      setIsLoading(true);

      navigate("/");
    } catch (e) {
      alert(e);
    }
    //This will submit update expense to firebase
  };

  return (
    <Container maxW="md">
      <form onSubmit={onUpdateExpenseHandler}>
        <Stack
          spacing={8}
          justifyContent="center"
          height="90vh"
          alignItems="center"
        >
          <Heading as="h2" size="2xl" textAlign="center">
            <Highlight
              query="Expense"
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "red.100",
                noOfLines: 2,
              }}
            >
              Update TITLE Expense
            </Highlight>
          </Heading>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CalendarIcon color="gray.300" />}
            />
            <Input
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
              placeholder="Balance for month. for eg. 1000"
              value={balance}
              onChange={(event) => setBalance(event.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Balance - " />
            <Input
              type="number"
              placeholder="Total amount spent . for eg.50"
              value={spentAmount}
              onChange={(event) => setSpentAmount(event.target.value)}
            />
          </InputGroup>
          <Text style={{ color: "gray" }}>
            Available Balance is Rs.
            {availableBalance}
          </Text>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            type="submit"
            width="max-content"
            isLoading={isLoading}
          >
            Update Expense
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default UpdateExpense;
