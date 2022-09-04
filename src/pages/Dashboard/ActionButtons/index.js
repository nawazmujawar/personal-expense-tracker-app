import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Stack } from "@chakra-ui/react";
import React from "react";
import "./styles.css";

const ActionButtons = (props) => {
  const { onDeleteAllHandler, onAddNewExpenseHandler } = props;

  return (
    <Stack>
      <IconButton
        aria-label="Add New Expense"
        colorScheme="teal"
        onClick={onAddNewExpenseHandler}
        icon={<AddIcon />}
        isRound
      />
      <IconButton
        colorScheme="red"
        aria-label="Delete List"
        icon={<DeleteIcon />}
        onClick={onDeleteAllHandler}
        isRound
      />
    </Stack>
  );
};
export default ActionButtons;
