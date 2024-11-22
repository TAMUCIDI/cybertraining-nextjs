
export default function TopHero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://static.wixstatic.com/media/11062b_bafdf9951a894d499fbe8329200d07de~mv2.jpeg/v1/fill/w_3815,h_803,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/11062b_bafdf9951a894d499fbe8329200d07de~mv2.jpeg)",
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-5xl">
          <h1 className="mb-5 text-4xl font-bold">CyberTraining for Disaster Management Network</h1>
          <h2 className="mb-5 text-3xl font-bold">(CTDM CyberTraining)</h2>
          {/* 
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
          */}
        </div>
      </div>
    </div>
  );
}