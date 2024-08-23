import "./App.css"
import Navbar from "./pages/navbar"
import Home from "./pages/home"
import MarketPlace from "./pages/marketplace"
import Character from "./pages/character"
import WhitePaper from "./pages/whitepaper"
import MyInventory from "./pages/myinventory"
import { useState ,useEffect} from "react"

import browserLang from 'browser-lang';
import { FormattedMessage, IntlProvider } from 'react-intl';
const supportedLanguages = ["en", "fr", "ru"];
function App() {

  const [lightMode, setLightMode] = useState(false);
  // Get the default locale based on browser language or fallback to 'en'
  const defaultLocale = browserLang({
    languages: supportedLanguages,
    fallback: "en"
  });

  // State for locale and messages (translations)
  const [locale, setLocale] = useState(defaultLocale);
  const [messages, setMessages] = useState(null);

  // Fetch translations whenever the locale changes
  useEffect(() => {
    const url = "https://api.i18nexus.com/project_resources/translations/${locale}/default.json?api_key=PzHliBIunFTF7gtbUHY7UA";
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMessages(data);
      })
      .catch(error => {
        console.error('Error fetching translations:', error);
      });
  }, [locale]);
  return (
    <IntlProvider locale={locale} messages={messages}>
    <div className={`App ${!lightMode && "dark" }`}>
      
      <Navbar setLightMode={setLightMode} locale={locale} setLocale={setLocale}/>
      <Home />
      <MarketPlace />
      <Character />
      <WhitePaper />
      <MyInventory />
    </div>
     </IntlProvider>
  )
}

export default App
