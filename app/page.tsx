'use client';

import CurvedArrow from '@/components/svg/CurvedArrow';
import StraightArrow from '@/components/svg/StraightArrow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

export default function Home() {
  const hiddenElementClass = 'opacity-0 pointer-events-none';
  const visibleElementClass = 'opacity-100 pointer-events-auto';

  const [todoInputValue, setTodoInputValue] = useState('');
  const [showTutorial, setShowTutorial] = useState(true);
  const [showCurvedArrow, setShowCurvedArrow] = useState(false);
  const [showTodoInput, setShowTodoInput] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowCurvedArrow(true);
    }, 500)
    setTimeout(() => {
      setShowTodoInput(true);
    }, 1000)
  }, [])

  const handleTodoInputChange = (todoValue: string) => {
    setTodoInputValue(todoValue.trim());
  }

  const detectEndOfTyping = () => {
    const doneTypingInterval = 1000; // 1 second after user stops typing
    const typingTimer = setTimeout(() => { setShowSubmitButton(true) }, doneTypingInterval)
    return () => clearTimeout(typingTimer)
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4 h-screen'>
      <div className='relative flex items-center justify-center'>
        <h1 className='text-2xl text-center md:text-5xl'>Add your Todo Now</h1>
        <CurvedArrow className={`absolute left-full ml-2 md:ml-4 h-8 md:h-16 transition-opacity duration-500 ease-out  ${showCurvedArrow ? visibleElementClass : hiddenElementClass}`} scale={0.5} fill='#ffffff' />
      </div>
      <Input name='todo input' className={`w-4/5 md:w-1/2  transition-opacity duration-500 ease-out ${showTodoInput ? visibleElementClass : hiddenElementClass}`}
        placeholder='By typing here'
        value={todoInputValue}
        onChange={(e) => handleTodoInputChange(e.target.value)}
        onKeyUp={() => detectEndOfTyping()}
      />
      <StraightArrow className={`h-8 fill-white rotate-180 ${showSubmitButton ? visibleElementClass : hiddenElementClass}`} />
      <Button className={`${showSubmitButton ? visibleElementClass : hiddenElementClass}`} variant="outline" title='Add Todo'>Add Todo</Button>
    </div>
  )
}
