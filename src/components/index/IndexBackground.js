import Image from 'next/image'
import bg from '/src/images/index_background1.jpg'
 
export default function IndexBackground() {
  return (
    <Image
      alt="1"
      src={bg}
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }}
    />
  )
}