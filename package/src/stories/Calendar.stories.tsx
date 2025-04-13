import type { Meta, StoryObj } from "@storybook/react"
import { getByTestId, userEvent, waitFor, within } from '@storybook/test'
import Calendar from "../Calendar"
import { useCallback, useRef, useState } from "react"

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
            <div style={{ backgroundColor: '#f8fafc' }}>
                <input className="form-control form-control-sm" type="text" ref={inputRef} />
                <Calendar inputRef={inputRef} />
            </div>
        )
    }
}

export const TestCalendarWithTime: Story = {
    args: {
        inputRef: null,
    },
    render: () => {
        const inputRef = useRef<HTMLInputElement | null>(null)

        return (
            <div style={{ backgroundColor: '#f8fafc' }}>
                <input className="form-control form-control-sm" type="text" ref={inputRef} />
                <Calendar inputRef={inputRef} showTime={true} />
            </div>
        )
    }
}

export const TestCalendarSelectOnBlur: Story = {
    args: {
        inputRef: null,
    },
    render: () => {
        const inputRef = useRef<HTMLInputElement | null>(null)
        const [selectedDate, setSelectedDate] = useState<string>('')

        const handleDateSelected = useCallback((date: string) => {
            console.log('[handleDateSelected] Selected date:', date)
            setSelectedDate(date)
        }, [])

        return (
            <div style={{ backgroundColor: '#f8fafc' }}>
                <input value={selectedDate} className="form-control form-control-sm" type="text" ref={inputRef} data-testid='selectedDate' />
                <Calendar inputRef={inputRef} data-testid="calendar" onDateSelected={handleDateSelected} />
            </div>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await userEvent.click(canvas.getByTestId('selectedDate'))

        await waitFor(() => {
            const today = new Date()
            const calendar = getByTestId(canvasElement, 'calendar')
            const dateList = within(calendar).getAllByText(today.getDate().toString())
            for (const date of dateList) {
                console.log('dateList', date.parentElement)
                if (date.parentElement?.hasAttribute('data-vc-date-today')) {
                    userEvent.click(date)
                    break
                }
            }
        })

    }
}