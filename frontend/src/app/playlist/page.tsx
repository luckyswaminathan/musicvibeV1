'use client';

import { useState, useEffect } from 'react';
import { redirect } from "next/navigation";

import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,

} from "@/components/ui/hover-card";

import { Playlist } from '../../types/Playlist';
const supabase = createClientComponentClient();

export default async function PlaylistPage() {



  
};