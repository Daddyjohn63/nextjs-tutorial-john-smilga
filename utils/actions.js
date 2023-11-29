'use server';
import prisma from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const getAllTasks = async () => {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const createTask = async formData => {
  //formData is a web api and is provided directly by next js as a parameter.

  const content = formData.get('content'); //note that 'content' needs to match with the 'name' attr below in the input element.

  console.log(content);
  // some validation here

  await prisma.task.create({
    data: {
      content
    }
  });
  // revalidate path
  revalidatePath('/tasks');
};

export const createTaskCustom = async (prevState, formData) => {
  //formData is a web api and is provided directly by next js as a parameter.
  // await new Promise(resolve => setTimeout(resolve, 2000));

  const content = formData.get('content'); //note that 'content' needs to match with the 'name' attr below in the input element.
  const Task = z.object({
    content: z.string().min(5)
  });
  //console.log(content);
  // some validation here
  try {
    Task.parse({
      //zod parse before we talk to prisma
      content
    });
    await prisma.task.create({
      data: {
        content
      }
    });
    // revalidate path
    revalidatePath('/tasks');
    return { message: 'success !!!' };
  } catch (error) {
    console.log(error);
    return { message: 'error...' };
  }
};

export const deleteTask = async formData => {
  const id = formData.get('id');
  await prisma.task.delete({ where: { id } });
  revalidatePath('/tasks');
};

export const getTask = async id => {
  return prisma.task.findUnique({
    where: {
      id
    }
  });
};

export const editTask = async formData => {
  const id = formData.get('id');
  const content = formData.get('content');
  const completed = formData.get('completed');

  await prisma.task.update({
    where: {
      id: id
    },
    data: {
      content: content,
      completed: completed === 'on' ? true : false
    }
  });
  // redirect won't works unless the component has 'use client'
  // another option, setup the editTask in the component directly
  redirect('/tasks');
};
