import { useState, useEffect } from 'react';
import axios from 'axios';

const url = (id? : string) => {
  return  id
  ? `https://livepeer.studio/api/room/${id}`
  : 'https://livepeer.studio/api/room'
}

const useLivePeer = () => {
  const useCreate = async () => {
    try {
      const response = await axios.post(url(), {}, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Failed to create new room', error);
    }
  };

  const useInvite = async (id: string, invitee: string) => {
    try {
      const response = await axios.post(`${url(id)}/user`, {
        name: invitee
      }, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Failed to invite', error);
    }
  };

  const useOpenStream = async (id: string) => {
    try {
      const response = await axios.post(`${url(id)}/egress`, {
        streamId: 'abc'//TODO
      }, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Failed to open stream', error);
    }
  };

  const useCloseStream = async (id: string) => {
    try {
      const response = await axios.delete(`${url(id)}/egress`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Failed to open stream', error);
    }
  };

  const useClose = async (id: string) => {
    try {
      const response = await axios.delete(url(id), {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Failed to close room', error);
    }
  };

  return { useCreate, useInvite, useClose ,useCloseStream, useOpenStream };
};

export default useLivePeer;
