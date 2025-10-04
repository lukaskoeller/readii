import { Link, router } from "expo-router";
import { FC } from "react";
import { Button } from "./Button/Button";

export const AddFeedButton: FC = () => {
  return (
    <Link href={"/add"}>
      <Button
        onPress={() => {
          router.navigate("/add");
        }}
        startIcon="plus"
      >
        Add Feed
      </Button>
    </Link>
  );
};
