import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, ArrowRight, Star, Instagram, Youtube, Twitter } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-black tracking-tight text-2xl">ATHLX</Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/collections" className="text-white/80 hover:text-white transition">Collections</Link>
          <a href="#story" className="text-white/80 hover:text-white transition">Our Story</a>
          <a href="#community" className="text-white/80 hover:text-white transition">Community</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="relative text-white">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1">0</span>
          </button>
          <button className="md:hidden text-white" onClick={() => setOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/80 md:hidden">
            <div className="p-6">
              <button className="text-white" onClick={() => setOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="px-8 space-y-6">
              <Link to="/collections" onClick={()=>setOpen(false)} className="block text-white text-2xl">Collections</Link>
              <a href="#story" onClick={()=>setOpen(false)} className="block text-white text-2xl">Our Story</a>
              <a href="#community" onClick={()=>setOpen(false)} className="block text-white text-2xl">Community</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  const navigate = useNavigate()
  return (
    <section className="relative min-h-[90vh] w-full bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/95 pointer-events-none" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24">
        <motion.h1 initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true}} transition={{duration:0.6}} className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.95]">
          Engineered for Performance. Designed for Legends.
        </motion.h1>
        <motion.p initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} transition={{delay:0.1, duration:0.6}} className="mt-6 max-w-2xl text-lg text-white/80">
          Push beyond limits with technology-fueled footwear and apparel built for speed, strength, and style.
        </motion.p>
        <motion.div initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} transition={{delay:0.2, duration:0.6}} className="mt-10 flex items-center gap-4">
          <button onClick={()=>navigate('/collections')} className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-semibold transition">
            Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition" />
          </button>
          <a href="#story" className="text-white/80 hover:text-white">Learn more</a>
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${API_BASE}/api/products?featured=true&limit=6`).then(r=>r.json()).then(setItems).catch(()=>{})
  }, [])
  const Card = ({p}) => (
    <motion.div whileHover={{y:-6}} className="group bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 relative">
        <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop'} alt={p.title} className="w-full h-full object-cover mix-blend-lighten opacity-90"/>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">{p.title}</h3>
          <span className="text-red-500 font-bold">${p.price?.toFixed?.(2) || '129.00'}</span>
        </div>
        <div className="mt-1 flex items-center gap-1 text-yellow-400">
          {Array.from({length:5}).map((_,i)=> <Star key={i} className={`w-4 h-4 ${i < Math.round(p.rating||4.5) ? '' : 'opacity-30'}`} fill="currentColor" />)}
          <span className="ml-2 text-xs text-white/60">({p.reviews_count || 120})</span>
        </div>
        <button className="mt-4 w-full bg-white text-black hover:bg-zinc-200 rounded-full py-2 font-semibold">Add to Cart</button>
      </div>
    </motion.div>
  )
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl sm:text-4xl font-black">Featured Performance</h2>
          <Link to="/collections" className="text-white/60 hover:text-white">View all</Link>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length ? items.map(p=> <Card key={p.id} p={p} />) :
            Array.from({length:6}).map((_,i)=> <Card key={i} p={{title:'Velocity Runner', price:129, rating:4.5, images:[`https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop`]}} />)
          }
        </div>
      </div>
    </section>
  )
}

function Story() {
  return (
    <section id="story" className="relative bg-black text-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-black">Performance. Innovation. Sustainability.</h2>
          <p className="mt-6 text-white/70 leading-relaxed">
            Every piece we create is pressure-tested with athletes and engineered with planet-first materials. From responsive foam to recycled fibers, our mission is simple: help you move faster while moving the world forward.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              {k:'Energy Return', v:'+18%'},
              {k:'Weight', v:'-12%'},
              {k:'Recycled', v:'65%'}
            ].map((m)=> (
              <div key={m.k} className="bg-zinc-900/60 border border-white/10 rounded-xl p-4">
                <p className="text-2xl font-black text-red-500">{m.v}</p>
                <p className="text-xs text-white/60">{m.k}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img className="rounded-2xl border border-white/10" src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxhdGhsZXRlfGVufDB8MHx8fDE3NjI5NDg0OTZ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="athlete"/>
          <div className="absolute -inset-6 -z-10 blur-3xl bg-red-600/20 rounded-full" />
        </div>
      </div>
    </section>
  )
}

function Collections() {
  const collections = [
    {name:'Men', slug:'men', image:'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxhdGhsZXRlfGVufDB8MHx8fDE3NjI5NDg0OTZ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'},
    {name:'Women', slug:'women', image:'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxNZW58ZW58MHwwfHx8MTc2Mjk0ODQ5Nnww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'},
    {name:'Kids', slug:'kids', image:'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxNZW58ZW58MHwwfHx8MTc2Mjk0ODQ5Nnww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'},
  ]
  return (
    <main className="bg-black text-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-black">Collections</h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map(c => (
            <Link key={c.slug} to={`/collections/${c.slug}`} className="group relative rounded-2xl overflow-hidden border border-white/10">
              <img src={c.image} alt={c.name} className="h-72 w-full object-cover group-hover:scale-105 transition duration-500"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-2xl font-bold">{c.name}</p>
                <p className="text-white/70 text-sm">Explore {c.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

function ProductPage() {
  const [index, setIndex] = useState(0)
  const gallery = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1600&auto=format&fit=crop'
  ]
  const sizes = ['6','7','8','9','10','11','12']
  const [size, setSize] = useState('9')
  return (
    <main className="bg-black text-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
        <div>
          <div className="relative rounded-3xl overflow-hidden border border-white/10">
            <motion.img key={index} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}} src={gallery[index]} className="w-full h-[520px] object-cover" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/10 to-transparent" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {gallery.map((src,i)=>(
              <button key={i} onClick={()=>setIndex(i)} className={`border rounded-xl overflow-hidden ${i===index? 'border-red-500':'border-white/10'}`}>
                <img src={src} className="h-24 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-black">Velocity Runner Pro</h1>
          <p className="mt-3 text-white/70">Responsive foam x carbon plate for explosive propulsion. Built for race day speed and everyday grind.</p>
          <p className="mt-6 text-2xl font-bold text-red-500">$189.00</p>

          <div className="mt-6">
            <p className="text-sm text-white/60">Select Size</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {sizes.map(s => (
                <button key={s} onClick={()=>setSize(s)} className={`px-4 py-2 rounded-full border ${size===s? 'bg-white text-black border-white':'border-white/20 text-white/80 hover:text-white'}`}>{s}</button>
              ))}
            </div>
          </div>

          <button className="mt-8 w-full bg-white text-black hover:bg-zinc-200 rounded-full py-3 font-semibold">Add to Cart</button>

          <div className="mt-10">
            <h3 className="font-semibold">Customer Reviews</h3>
            <div className="mt-3 space-y-4">
              {[{n:'Alex P.',t:'Shaved 30s off my 5K PR. Unreal pop.'},{n:'Jordan K.',t:'Comfort and speed in one. Love the fit.'}].map((r,i)=>(
                <div key={i} className="border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-yellow-400">
                    {Array.from({length:5}).map((_,i)=> <Star key={i} className="w-4 h-4" fill="currentColor" />)}
                  </div>
                  <p className="mt-2 text-white/80">{r.t}</p>
                  <p className="mt-1 text-white/40 text-sm">— {r.n}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function Community() {
  const [athletes, setAthletes] = useState([])
  useEffect(()=>{
    fetch(`${API_BASE}/api/athletes?limit=6`).then(r=>r.json()).then(setAthletes).catch(()=>{})
  },[])
  const Card = ({a}) => (
    <div className="group border border-white/10 rounded-2xl overflow-hidden bg-zinc-900/50">
      <img src={a.image || 'https://images.unsplash.com/photo-1521417531039-75e91486cc40?q=80&w=1600&auto=format&fit=crop'} className="h-64 w-full object-cover group-hover:scale-105 transition duration-500"/>
      <div className="p-5">
        <p className="font-semibold">{a.name || 'Taylor Brooks'}</p>
        <p className="text-white/60 text-sm">{a.sport || 'Track & Field'}</p>
      </div>
    </div>
  )
  return (
    <section id="community" className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl sm:text-4xl font-black">Athletes & Community</h2>
          <p className="text-white/60">Built with and for athletes everywhere.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {athletes.length ? athletes.map(a=> <Card key={a.id} a={a} />) : Array.from({length:6}).map((_,i)=> <Card key={i} a={{}} />)}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const subscribe = async () => {
    setStatus('')
    try {
      const res = await fetch(`${API_BASE}/api/newsletter`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email})})
      if(res.ok){ setStatus('Thanks for joining!'); setEmail('') } else { setStatus('Please try again') }
    } catch {
      setStatus('Please try again')
    }
  }
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-2xl font-black">Stay moving.</p>
          <p className="text-white/60 mt-2">Sign up for drops, events, and training insights.</p>
        </div>
        <div className="flex gap-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email" className="flex-1 bg-zinc-900 border border-white/10 rounded-full px-5 py-3 text-white placeholder-white/40 outline-none"/>
          <button onClick={subscribe} className="bg-red-600 hover:bg-red-500 rounded-full px-6 font-semibold">Join</button>
        </div>
        {status && <p className="md:col-span-2 text-green-500">{status}</p>}
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-10 flex items-center justify-between text-white/60 text-sm">
        <p>© {new Date().getFullYear()} ATHLX</p>
        <div className="flex items-center gap-4">
          <a className="hover:text-white" href="#"><Instagram className="w-5 h-5"/></a>
          <a className="hover:text-white" href="#"><Twitter className="w-5 h-5"/></a>
          <a className="hover:text-white" href="#"><Youtube className="w-5 h-5"/></a>
        </div>
      </div>
    </footer>
  )
}

function Home() {
  return (
    <>
      <Hero/>
      <FeaturedProducts/>
      <Story/>
      <Community/>
      <Footer/>
    </>
  )
}

function PageTransitions() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} transition={{duration:0.3}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/collections" element={<Collections/>} />
          <Route path="/product/:id" element={<ProductPage/>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Navbar/>
        <PageTransitions/>
      </div>
    </Router>
  )
}

export default App
