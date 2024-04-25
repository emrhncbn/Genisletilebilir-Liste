import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  return (
   <div className="center">
  <GenerateList />
  </div>)
}

const GenerateList = () => {
  //KODUNUZ BURAYA GELECEK
  const [activities, setActivities] = useState([])

  // Yeni bir aktivite almak için APIyi çağıran fonksiyon
  const fetchActivity = async () => {
    try {
      // Axios ile API'den veri alınması
      const response = await axios.get("https://www.boredapi.com/api/activity")
      // Yeni aktiviteyi durumda güncelleme
      const newActivity = response.data
      setActivities(prevActivities => [...prevActivities, newActivity])
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  }

  useEffect(() => {
    fetchActivity()
  }, [])

  return (
    <div className="container">
      <button className="title" onClick={fetchActivity}>Generate Activity</button>
      <ul className="list">
      {activities.map((activity) => (
        <ExpandableListItem key={crypto.randomUUID()} item={activity} />
      ))}
      </ul>
    </div>
  )
}

const ExpandableListItem = ({ item }) => {
  // KODUNUZ BURAYA GELECEK

  // Aktivitenin genişletilip genişletilmediğini tutan durum
  const [expanded, setExpanded] = useState(false)

   // Genişletme durumunu tersine çeviren fonksiyon
  const toggleExpanded = () => {
    setExpanded((pre) => !pre)
  }

  return (
    <li className="container-item">
    <div className="item-header">
      <h4>{item.activity}</h4>
    <button onClick={toggleExpanded}>Expand</button>
    </div>
    {expanded && (
      <div>
        <p><strong>Activity:</strong> {item.activity}</p>
        <p><strong>Type:</strong> {item.type}</p>
        <p><strong>Participants:</strong> {item.participants}</p>
        <p><strong>Price:</strong> {item.price}</p>
        <p><strong>Link:</strong> {item.link}</p>
        <p><strong>Accessibility:</strong> {item.accessibility}</p>
      </div>
    )}
  </li>
  )
}

export default App
