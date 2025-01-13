import React from 'react'
import './Dash.css'
import chart from '../../../imgs/chart-dynamic-premium.png'



const Maindash = () => {
  return (
    <div className='MainDash'>
       
       <main className="content px-3 py-2 ">
      <div className="container-fluid">
        
        <div className="row">
          <div className="col-12 d-flex">
            <div className="cardDahboard flex-fill border-0 illustration rounded">
              <div className="cardDahboard-body p-0 d-flex flex-fill">
                <div className="row g-0 w-100">
                  {/* Section gauche */}
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <div className="p-3 m-1">
                      <h4>Welcome Back, Admin</h4>
                      <p className="mb-0">
                        Admin Dashboard, name lastname
                      </p>
                    </div>
                  </div>
                  {/* Section droite */}
                  <div className="col-6">
                    <img
                      src={chart}
                      width="550"
                      className="img-fluid illustration-img"
                      alt="imgDash"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  )
}

export default Maindash
