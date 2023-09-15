import Image from '../assets/img/whitemoon.png'
import home from '../assets/img/home.jpg'

export default function Home() {

  const backgroundImageStyle = {
    backgroundImage: `url(${home})`,
    backgroundSize: 'cover', // You can adjust this property as needed
    backgroundPosition: 'center', // You can adjust this property as needed
  };

  return (
     <div className="flex flex-col justify-center items-center h-screen" style={backgroundImageStyle}>
      <h1 className="text-4xl font-bold lg:text-7xl">Everything Dark</h1>
      <p className="p-2">music - fashion - graphic arts</p>
        <img className="w-5" src={Image} alt="image of whitemoon"/>
    </div>
  )
}
