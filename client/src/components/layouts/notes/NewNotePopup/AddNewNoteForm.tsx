import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@shared/utils/trpc';
import { NoteCreateInput } from '@shared/utils/trpc/types';
import { useQueryClient } from '@tanstack/react-query';
import React, { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import AddNewNoteFormSkeleton from './AddNewNoteFormSkeleton';

const noteInput = z
  .object({
    text: z.string(),
    title: z.string(),
    color: z.string().min(1, 'Please select a valid color'),
    categorie: z.string(),
  })
  .superRefine(({ text, title }, ctx) => {
    if (!text && !title) {
      ctx.addIssue({
        code: 'custom',
        message: 'Please please provide either the title or the content',
        path: ['title'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'Please please provide either the title or the content',
        path: ['text'],
      });
    }
  });

const AddNewNoteForm = ({ onClose, isTask = false }: { onClose?: () => void; isTask?: boolean }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = trpc.note.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.note.get.getQueryKey());
      onClose && onClose();
    },
  });

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(noteInput),
    defaultValues: {
      title: '',
      text: '',
      color: '',
      categorie: isTask ? 'task' : 'note',
    },
  });
  const handleCreateNote = (values: NoteCreateInput) => {
    // console.log(values);
    mutate(values);
  };

  if (isLoading) return <AddNewNoteFormSkeleton />;
  return (
    <div className='space-y-5'>
      <div className='flex justify-between items-end'>
        <div className='text-2xl'>Add new {isTask ? 'task' : 'note'}</div>
        <button onClick={onClose} className='flex items-center justify-end space-x-2'>
          <div className='text-red-600 text-sm font-bold'>Cancel</div>
        </button>
      </div>
      <div className='space-y-2'>
        <Controller
          control={control}
          name='title'
          render={({ field, fieldState }) => (
            <fieldset>
              <label className='label'>{isTask ? 'Task' : 'Note'} title</label>
              <input
                className='input'
                placeholder={isTask ? 'Work on Noty project' : 'Take out the dog 😅'}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              <div className='error-message'>{fieldState.error?.message}</div>
            </fieldset>
          )}
        />
        <Controller
          control={control}
          name='text'
          render={({ field, fieldState }) => (
            <fieldset>
              <label className='label'>{isTask ? 'Task' : 'Note'} body</label>
              <textarea
                className='input'
                placeholder={
                  isTask
                    ? 'Add new features to Noty project'
                    : 'Take my dog to the park its been too long since i walked him'
                }
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              <div className='error-message'>{fieldState.error?.message}</div>
            </fieldset>
          )}
        />
        <Controller
          control={control}
          name='color'
          render={({ field, fieldState }) => (
            <section className='space-y-1'>
              <div className='flex items-center justify-between'>
                <label className='label'>{isTask ? 'Task' : 'Note'} Color</label>
                <div className='relative h-5 w-5'>
                  <input
                    className='absolute top-0 left-0 h-full w-full opacity-0 z-[2]'
                    type='color'
                    placeholder='Take my dog to the park its been too long since i walked him'
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <button className='absolute top-0 left-0 h-5 w-5 flex items-center justify-center'>
                    <div className='w-4 h-4 bg-black rounded-md' style={{ background: field.value }}></div>
                  </button>
                </div>
              </div>
              <div className='error-message'>{fieldState.error?.message}</div>
              <p className='text-gray-500 text-xs'>
                Note color will be determined automaticly based on background color
              </p>
            </section>
          )}
        />
        {isError && <div className='error-message'>{error?.message}</div>}
        <Fragment>
          <button className='primary-button ml-auto' onClick={handleSubmit(handleCreateNote)}>
            Create
          </button>
        </Fragment>
      </div>
    </div>
  );
};

export default AddNewNoteForm;
