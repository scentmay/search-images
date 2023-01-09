import { Formik, Form, Field } from 'formik'
import { useState } from 'react'
import './header.css'
import './content.css'
import './article.css'

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)



  // con este console.log verificamos que está trayendo las fotos
  console.log(photos)
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            //llamar a api de unsplash
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers:{
                'Authorization': 'Client-ID npRdHBLLBogORMzBjI1mgk13ZtOn1f4EgKSo8MILRyw'
              }
            })
            // transformamos lo que nos devuelve la api en un objeto jason
            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name='search' />
          </Form>
        </Formik>
      </header> 
      <div className='container'>
        <div className='center'>
          {photos.map(photo => 
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>)}
        </div>
      </div>
    </div>
  )
}

export default App
