import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@shared/utils/trpc/trpc';
import { NoteCreateInput } from '@shared/utils/trpc/types';
import { useQueryClient } from '@tanstack/react-query';
import React, { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

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
      color: '#FFFFFF',
      categorie: isTask ? 'task' : 'note',
    },
  });
  const handleCreateNote = (values: NoteCreateInput) => {
    // console.log(values);
    mutate(values);
  };

  return (
    <div className='space-y-5 bg-white border-gray-200 border-[1px] rounded-md w-[280px] md:mx-auto p-5 shadow-md'>
      {isLoading ? (
        <>
          <div className='flex justify-between animate-pulse'>
            <div className='skeleton h-4 my-3 w-[50%]' />
            <div className='skeleton h-4 my-3 w-[20%]' />
          </div>
          <div className='space-y-2 animate-pulse'>
            <fieldset className='space-y-2'>
              <label className='label'>
                <div className='skeleton h-3 w-[20%]' />
              </label>
              <input className='input skeleton' disabled />
            </fieldset>
            <fieldset className='space-y-2'>
              <label className='label'>
                <div className='skeleton h-3 w-[20%]' />
              </label>
              <input className='input skeleton h-[62px]' disabled />
            </fieldset>
            <section className='space-y-3'>
              <div className='flex items-center justify-between w-full'>
                <div className='skeleton h-3 w-[20%]' />
                <div className='skeleton h-3 w-3' />
              </div>
              <div className='skeleton h-2 w-[100%]' />
              <div className='skeleton h-2 w-[40%]' />
            </section>
            <div className='skeleton-button ml-auto'>
              <div className='h-2 w-[40px]' />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='flex justify-between items-end'>
            <div className='text-2xl'>Add new {isTask ? 'task' : 'note'}</div>
            <button onClick={onClose} className='flex items-center justify-end space-x-2'>
              <div className='text-red-600 text-sm font-bold'>Cancel</div>
            </button>
          </div>
          <div className='space-y-5'>
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
                  <div className='flex items-end justify-between'>
                    <p className='label'>{isTask ? 'Task' : 'Note'} Color</p>
                    <Fragment>
                      <div className='flex space-x-2 items-end'>
                        <p className='text-sm'>{field.value}</p>
                        <div className='relative rounded-md overflow-hidden h-5 w-14 border-[1px]'>
                          <input
                            style={{ background: field.value }}
                            className='absolute top-0 left-0 h-full w-full opacity-0 z-[2]'
                            type='color'
                            placeholder='Take my dog to the park its been too long since i walked him'
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                          />
                          <button className='w-[100%] h-full' style={{ background: field.value }}></button>
                        </div>
                      </div>
                    </Fragment>
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
        </>
      )}
    </div>
  );
};

export default AddNewNoteForm;
