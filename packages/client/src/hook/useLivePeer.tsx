import axios from 'axios';
import { useState } from 'react';

const url = (id? : string) => {
  return  id
  ? `https://livepeer.studio/api/room/${id}`
  : 'https://livepeer.studio/api/room'
}

const useLivePeer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const useCreate = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(url(), {}, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        },
      });
      setIsLoading(false)
      return response.data;
    } catch (error) {
      setIsLoading(false)
      console.log('Failed to create new room', error);
    }
  };

  const useInvite = async (id: string, invitee: string) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`${url(id)}/user`, {
        name: invitee
      }, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        },
      });
      setIsLoading(false)
      return response.data;
    } catch (error) {
      setIsLoading(false)
      console.log('Failed to invite', error);
    }
  };

  const useOpenStream = async (id: string, streamId: string) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`${url(id)}/egress`, {
        streamId
      }, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        },
      });
      setIsLoading(false)
      return response.data;
    } catch (error) {
      setIsLoading(false)
      console.log('Failed to open stream', error);
    }
  };

  const useCloseStream = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await axios.delete(`${url(id)}/egress`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        },
      });
      setIsLoading(false)
      return response.data;
    } catch (error) {
      setIsLoading(false)
      console.log('Failed to open stream', error);
    }
  };

  const useClose = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await axios.delete(url(id), {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        },
      });
      setIsLoading(false)
      return response.data;
    } catch (error) {
      setIsLoading(false)
      console.log('Failed to close room', error);
    }
  };

  const useIsHealthy = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`https://livepeer.studio/api/stream/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        },
      });
      setIsLoading(false)
      return response.data;
    } catch (error) {
      setIsLoading(false)
      console.log('Failed to get healthy', error);
    }
  };

  return { isLoading, useCreate, useInvite, useClose ,useCloseStream, useOpenStream, useIsHealthy };
};

export default useLivePeer;
