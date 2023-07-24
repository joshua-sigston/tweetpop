import React, { FormEvent, useCallback, useLayoutEffect, useRef, useState } from 'react'
import Button from './Button'
import ProfileImg from './ProfileImg'
import { useSession } from 'next-auth/react'
import { test } from 'node:test'
import { api } from '~/utils/api'

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

function TweetForm() {
  const session = useSession();
  if (session.status !== "authenticated") return null;

  return <Form />;
}

function Form() {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);
  
  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const createTweet = api.tweet.create.useMutation({ 
    onSuccess: (newTweet) => {
      setInputValue("");
    } 
  });

  if (session.status !== "authenticated") return;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createTweet.mutate({content: inputValue})
  }

  return (
    <form onSubmit={handleSubmit} action="" className='flex flex-col gap-2 border-p px-4 py-2'>
      <div className='flex gap-4'>
        <ProfileImg src={session.data.user.image}/>
        <textarea style={{height: 0}} 
                  ref={inputRef}
                  placeholder='whats happening' 
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  className='flex-grow resize-none overflow-hidden p-4 text-lg outline-none' 
        />
      </div>
      <Button className='self-end'>Tweet</Button>
    </form>
  )
}

export default TweetForm
