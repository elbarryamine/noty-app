import React from 'react';
import { NoteResponse } from '@shared/utils/trpc/types';
import NoteDelete from './NoteDelete';
import NoteRestore from './NoteRestore';
import * as hexContrastColor from 'hex-contrast-color';

export default function NoteCard({ note }: { note: NoteResponse[number] }) {
  const invertedColor = hexContrastColor(note.color);
  return (
    <div className='relative w-full group border rounded-md' style={{ borderColor: invertedColor + 10 }}>
      <div
        className='space-y-2 p-5 rounded-md shadow-sm group-hover:opacity-10'
        style={{ background: note.isTrashed ? 'white' : note.color }}
      >
        <h3 className='text-xl font-bold' style={{ color: invertedColor }}>
          {note.title}
        </h3>
        <h3 style={{ color: invertedColor }}>{note.text}</h3>
      </div>
      <div className='absolute right-0 top-0 h-full w-full flex items-center justify-center'>
        <NoteDelete note={note} />
        <NoteRestore note={note} />
      </div>
    </div>
  );
}
