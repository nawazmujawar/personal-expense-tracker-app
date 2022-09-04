import React from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Stat,
  StatNumber,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import "./styles.css";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig/firebase";

const { useRef } = React;

const ExpenseCard = (props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { expenseTitle, balance } = props.data.data;
  const { id } = props.data;

  console.log("data", props.data);

  console.log("bln", props.data);
  const navigate = useNavigate();

  const onEditHandler = () => {
    navigate(`/update/${id}`);
  };

  const onDeleteHandler = async () => {
    const expenseDocRef = doc(db, "expenses", id);
    await deleteDoc(expenseDocRef);
  };

  return (
    <>
      <Box
        p={4}
        display={{ md: "flex" }}
        maxWidth="32rem"
        borderWidth={1}
        margin={6}
        shadow="lg"
      >
        <Stack spacing={5} style={{ width: "100%" }}>
          <Heading as="h5" size="sm" textAlign="center">
            {expenseTitle}
          </Heading>

          <div className="amountStyle">
            <Text fontSize="sm">Available Balance </Text>
            <Stat>
              <StatNumber textAlign="center">₹ {balance}</StatNumber>
            </Stat>
          </div>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={4}
          >
            <Button
              colorScheme="red"
              leftIcon={<DeleteIcon />}
              size="xs"
              onClick={onOpen}
            >
              Delete
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              leftIcon={<EditIcon />}
              size="xs"
              onClick={onEditHandler}
            >
              Edit
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Alert
        onDeleteHandler={onDeleteHandler}
        title={expenseTitle}
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
      />
    </>
  );
};

export default ExpenseCard;
