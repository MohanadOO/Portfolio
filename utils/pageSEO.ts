import { useRouter } from 'next/router'

export default function pageSEO(path: string) {
  const router = useRouter()
  const locale = router.locale
  const pathName = 'https://mohanad.in' + '/' + path

  return { locale, pathName }
}
