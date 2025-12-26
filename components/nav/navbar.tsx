'use client';
import ThemeSwitch from '@/components/nav/theme-toggle';
import React from 'react'



function Navbar() {
    return (
        <div className='p-4'>
            <ThemeSwitch />
        </div>
    )
}

export default Navbar