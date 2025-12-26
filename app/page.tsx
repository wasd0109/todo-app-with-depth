'use client';

import CurvedArrow from '@/components/svg/curved-arrow';
import StraightArrow from '@/components/svg/straight-arrow';
import TodoList from '@/components/todo-list/todo-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { scheduleTransition } from '@/lib/animationUtils';
import { detectEndOfTyping } from '@/lib/inputUtils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type ShowTransitionFlag = {
  curvedArrow: boolean;
  todoInput: boolean;
  submitArrow: boolean;
  submitButton: boolean;
  todoList: boolean;
}

const hiddenElementClass = 'opacity-0 pointer-events-none';
const visibleElementClass = 'opacity-100 pointer-events-auto';
const transitionClass = 'transition-opacity duration-500 ease-out';

const initialTransitionFlag = {
  curvedArrow: false,
  todoInput: false,
  submitArrow: false,
  submitButton: false,
  todoList: false,
}

export default function Home() {
  const { theme } = useTheme();
  const [todoInputValue, setTodoInputValue] = useState('');
  const [showTutorial, setShowTutorial] = useState(true);
  const [showTransitionFlag, setShowTransitionFlag] = useState(initialTransitionFlag);

  const startShowTransition = (key: string) => {
    setShowTransitionFlag(prev => ({ ...prev, [key]: true }))
  }
  const handleTransitionClass = (flagKey: keyof ShowTransitionFlag) => {
    return `${transitionClass} ${showTransitionFlag[flagKey] ? visibleElementClass : hiddenElementClass}`
  }
  const handleFillSvg = (currentTheme: string | undefined) => {
    return currentTheme === "dark" && "fill-white"
  }


  const initialTransitionsDefs = [
    {
      callback: () => startShowTransition("curvedArrow"),
      delay: 500,
    },
    {
      callback: () => startShowTransition("todoInput"),
      delay: 1000,
    },
  ]

  const submitTransitionDefs = [
    {
      callback: () => startShowTransition("submitArrow"),
      delay: 0,
    },
    {
      callback: () => startShowTransition("submitButton"),
      delay: 250,
    }
  ]

  useEffect(() => {
    if (showTutorial) {
      scheduleTransition(initialTransitionsDefs);
    }
  }, [])

  const handleTodoInputChange = (todoValue: string) => {
    setTodoInputValue(todoValue.trim());
  }

  const onAddTodo = () => {
    scheduleTransition({
      callback: () => startShowTransition("todoList"),
      delay: 200,
    })
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4 h-screen'>
      <div className='relative flex items-center justify-center'>
        <h1 className='text-xl text-center md:text-5xl'>Add your Todo Now</h1>
        <CurvedArrow className={`absolute left-full ml-2 md:ml-4 h-8 md:h-16 ${handleTransitionClass("curvedArrow")} ${handleFillSvg(theme)}`} scale={0.5} />
      </div>
      <Input name='todo input' className={`w-4/5 md:w-1/2 dark:fill-white  ${handleTransitionClass("todoInput")}`}
        placeholder='By typing here'
        value={todoInputValue}
        onChange={(e) => handleTodoInputChange(e.target.value)}
        onKeyUp={() => detectEndOfTyping(1000, () => scheduleTransition(submitTransitionDefs))}
      />
      <StraightArrow className={`h-8 rotate-180 dark:fill-white ${handleTransitionClass("submitArrow")} ${handleFillSvg(theme)}`} />
      <Button
        className={`${handleTransitionClass("submitButton")}`} variant="outline"
        onClick={() => onAddTodo()}
        title='Add Todo'>Add Todo</Button>
      <TodoList className={`${handleTransitionClass("todoList")}`} />
    </div>
  )
}
