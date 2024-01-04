import project from './project'
import mySkill from './mySkill'
import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import localeString from './locale/localeString'
import localeText from './locale/localeText'
import certificate from './certificate'
import provider from './provider'
import about from './about'
import customNote from './customNote'
import video from './video'
import imageType from './imageType'
import codeEmbed from './codeEmbed'
import customNoteType from './customNoteType'
import assets from './assets'
import projectsCategory from '@/sanity/schemas/projectsCategory'
import skillCategory from '@/sanity/schemas/skillCategory'
import boxColor from '@/sanity/schemas/boxColor'

export const schemaTypes = [
  project,
  mySkill,
  about,
  certificate,
  provider,
  post,
  author,
  category,
  blockContent,
  localeString,
  localeText,
  customNote,
  customNoteType,
  video,
  imageType,
  codeEmbed,
  assets,
  projectsCategory,
  skillCategory,
  boxColor,
]
