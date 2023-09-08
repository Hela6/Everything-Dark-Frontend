import Image from '../assets/img/whitemoon.png'

export default function Home() {
  return (
     <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Everything Dark</h1>
      <p className="p-2">music - fashion - graphic arts</p>
        <img className="w-5" src={Image} alt="image of whitemoon"/>
    </div>
  )
}
