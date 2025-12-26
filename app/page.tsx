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
const opacityTransitionClass = 'transition-all duration-500 ease-out';


const tutorialTransitionFlag = {
  curvedArrow: false,
  todoInput: false,
  submitArrow: false,
  submitButton: false,
  todoList: false,
}

const normalTransitionFlag = {
  curvedArrow: false,
  todoInput: true,
  submitArrow: false,
  submitButton: true,
  todoList: true,
}

const testTransitionFlag = {
  curvedArrow: true,
  todoInput: true,
  submitArrow: true,
  submitButton: true,
  todoList: true,
}

export default function Home() {
  const [todoInputValue, setTodoInputValue] = useState('');
  const [todoListItems, setTodoListItems] = useState<string[]>([]);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showTransitionFlag, setShowTransitionFlag] = useState(tutorialTransitionFlag);

  const { theme } = useTheme();

  const initialTransitionsDefs = [
    {
      callback: () => startShowTransition("curvedArrow"),
      delay: 500,
    },
    {
      callback: () => startShowTransition("todoInput"),
      delay: 1000,
    },
  ];

  const submitTransitionDefs = [
    {
      callback: () => startShowTransition("submitArrow"),
      delay: 0,
    },
    {
      callback: () => startShowTransition("submitButton"),
      delay: 250,
    }
  ];

  useEffect(() => {
    if (showTutorial) {
      scheduleTransition(initialTransitionsDefs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTodoInputChange = (todoValue: string) => {
    setTodoInputValue(todoValue.trim());
  };

  const handleAddTodo = () => {
    if (todoInputValue === '') return;
    setTodoListItems(prevItems => [...prevItems, todoInputValue]);
    setTodoInputValue('');

    scheduleTransition({
      callback: () => startShowTransition("todoList"),
      delay: 200,
    });
  };

  const startShowTransition = (key: string) => {
    setShowTransitionFlag(prev => ({ ...prev, [key]: true }));
  };

  const handleOpacityTransitionClass = (flagKey: keyof ShowTransitionFlag) => {
    return `${opacityTransitionClass} ${showTransitionFlag[flagKey] ? visibleElementClass : hiddenElementClass}`;
  };

  const handlePositionTransitionClass = () => {
    return `${opacityTransitionClass} ${todoListItems.length === 0 ?
      'h-full' : 'h-60'}`;
  };

  const handleFillSvg = (currentTheme: string | undefined) => {
    return currentTheme === "dark" && "fill-white";
  };


  return (
    <div className={`flex flex-col items-center justify-center gap-4 p-4 transform ${handlePositionTransitionClass()}`}>
      <div className={`flex flex-col items-center justify-center gap-4 w-full`}>
        <div className='relative flex items-center justify-center'>
          <h1 className='text-xl text-center md:text-5xl'>Add your Todo Now</h1>
          <CurvedArrow className={`absolute left-full ml-2 md:ml-4 h-8 md:h-16 ${handleOpacityTransitionClass("curvedArrow")} ${handleFillSvg(theme)}`} scale={0.5} />
        </div>
        <Input name='todo input' className={`w-4/5 md:w-1/2 dark:fill-white  ${handleOpacityTransitionClass("todoInput")}`}
          placeholder='By typing here'
          value={todoInputValue}
          onChange={(e) => handleTodoInputChange(e.target.value)}
          onKeyUp={() => detectEndOfTyping(1000, () => scheduleTransition(submitTransitionDefs))}
        />
        <StraightArrow className={`h-8 rotate-180 dark:fill-white ${handleOpacityTransitionClass("submitArrow")} ${handleFillSvg(theme)}`} />
        <Button
          className={`${handleOpacityTransitionClass("submitButton")}`} variant="outline"
          onClick={handleAddTodo}
          title='Add Todo'>Add Todo</Button>
      </div>
      <TodoList items={todoListItems} className={`${handleOpacityTransitionClass("todoList")}`} />
    </div>
  )
}
