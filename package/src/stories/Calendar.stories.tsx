import type { Meta, StoryObj } from "@storybook/react";
import Calendar from "../Calendar";
import { useRef } from "react";

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    inputRef: null,
  },
  render: () => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    return (
      <div style={{ backgroundColor: '#f8fafc'}}>
        <input className="form-control form-control-sm" type="text" ref={inputRef} />
        <Calendar inputRef={inputRef} />
      </div>
    )
  }
}