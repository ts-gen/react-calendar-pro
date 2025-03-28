import type { StoryObj } from "@storybook/react";
import Calendar from "../Calendar";
import { useRef } from "react";

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    inputRef: null,
  },
  render: () => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
      <>
        <input className="form-control form-control-sm" type="text" ref={inputRef} />
        <Calendar inputRef={inputRef} />
      </>
    )
  }
}