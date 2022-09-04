import React from "react";
import {
  Heading,
  IconButton,
  Button,
  Highlight,
  Container,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import "./styles.css";
import ExpenseCard from "../../components/ExpenseCard";
import ActionButtons from "./ActionButtons";
import { useHistory, useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig/firebase";

const { useState, useRef, useEffect } = React;

const DUMMY_DATA = [
  {
    id: 1,
    title: "Abc",
    amountRemaining: 500,
  },
  {
    id: 2,
    title: "Petrol",
    amountRemaining: 1200,
  },
  {
    id: 3,
    title: "XYZ",
    amountRemaining: 1230,
  },
  {
    id: 4,
    title: "Recharge",
    amountRemaining: 50,
  },
  {
    id: 5,
    title: "Cable",
    amountRemaining: 234,
  },
  {
    id: 6,
    title: "Eats",
    amountRemaining: 112,
  },
];

const Dashboard = (props) => {
  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [allExpenses, setAllExpenses] = useState([]);

  const onDeleteAllHandler = () => {
    // This will delete  all expenses from database
    console.log("All delete clicked");
    onOpen();
  };

  const onAddNewExpenseHandler = () => {
    //This will add one new expense to database
    console.log("Add button clicked");

    navigate("/new");
  };

  useEffect(() => {
    const q = query(collection(db, "expenses"));
    onSnapshot(q, (querySnapshot) => {
      setAllExpenses(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  console.log("All Expenses", allExpenses);

  return (
    <Container maxW="md">
      <div style={{ padding: "20px 0px" }}>
        <Heading as="h2" size="xl">
          Personal
        </Heading>
        <Heading as="h2" size="2xl" noOfLines={3}>
          <Highlight
            query="Expense"
            styles={{ px: "1", py: "1", bg: "red.100" }}
          >
            Expense Tracker.
          </Highlight>
        </Heading>
        {allExpenses.map((expenseItem) => (
          <React.Fragment key={expenseItem.id}>
            <ExpenseCard data={expenseItem} />
          </React.Fragment>
        ))}
        <div className="actionButtons">
          <ActionButtons
            onDeleteAllHandler={onDeleteAllHandler}
            onAddNewExpenseHandler={onAddNewExpenseHandler}
          />
        </div>
      </div>
      <Alert
        isOpen={isOpen}
        onClose={onClose}
        title="All"
        cancelRef={cancelRef}
      />
    </Container>
  );
};

export default Dashboard;
