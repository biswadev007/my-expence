import { Fragment } from "react";

import Appbar from "@/components/Appbar";
import AddExpense from "@/components/AddExpense";
import ExpenseList from "@/components/ExpenseList";
import FootBar from "@/components/FootBar";

export default function Home() {
  return (
    <Fragment>
      <Appbar />
      <AddExpense />
      <ExpenseList />
      <FootBar />
    </Fragment>
  );
}
