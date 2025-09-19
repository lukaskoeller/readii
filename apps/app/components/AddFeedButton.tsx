import { Link, router } from "expo-router";
import { FC } from "react";
import { Button } from "./Button/Button";

export const AddFeedButton: FC = () => {
  return (
    <Link href={"/home/add"}>
      <Button
        onPress={() => {
          router.navigate("/home/add");
        }}
      >
        Add Feed
      </Button>
    </Link>
  );
};
