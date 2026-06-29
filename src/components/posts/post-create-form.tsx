"use client";

import { useActionState, startTransition } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import * as actions from "@/actions";
import FormButton from "../common/form-button";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action, isPending] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    },
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 w-80 p-4 ">
            <h3 className="text-lg">Create Post</h3>
            <Input
              type="text"
              name="title"
              label="Title"
              labelPlacement="outside"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState?.errors?._form && (
              <div className="p-2 bg-red-200 border border-red-400 rounded-md text-center">
                {formState.errors._form}
              </div>
            )}
            <FormButton isLoading={isPending}>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
