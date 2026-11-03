import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, ShoppingBag, Plus, Minus, Instagram } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { id: 1, name: 'The Form Shirt', category: 'CAMISA DE ALGODÃO', price: 289, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85', tag: 'BESTSELLER' },
  { id: 2, name: 'Structure Trousers', category: 'CALÇA DE ALFAIATARIA', price: 379, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85', tag: 'NEW SEASON' },
  { id: 3, name: 'Essential Knit', category: 'TRICÔ TEXTURIZADO', price: 329, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85', tag: 'LIMITED' },
  { id: 4, name: 'No. 04 Outerwear', category: 'JAQUETA ESTRUTURADA', price: 649, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85', tag: 'EDITORIAL PICK' }
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker, .hero-title-line, .hero-copy, .hero-actions', {
        y: 34, opacity: 0, duration: 1.05, stagger: 0.12, ease: 'power3.out', delay: 0.2
      })
      gsap.from('.hero-image', { scale: 1.12, duration: 1.8, ease: 'power3.out', delay: 0.15 })
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el, { y: 42, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        })
      })
      gsap.to('.hero-image', {
        yPercent: 13, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const addToCart = (product) => setCart(items => {
    const found = items.find(item => item.id === product.id)
    return found ? items.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...items, { ...product, qty: 1 }]
  })
  const changeQty = (id, delta) => setCart(items => items.map(item => item.id === id ? { ...item, qty: item.qty + delta } : item).filter(item => item.qty > 0))
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return <>
    <header className="site-header">
      <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={`nav-left ${menuOpen ? 'is-open' : ''}`}>
        <a href="#colecao" onClick={() => setMenuOpen(false)}>COLEÇÃO</a>
        <a href="#manifesto" onClick={() => setMenuOpen(false)}>MANIFESTO</a>
        <a href="#atelier" onClick={() => setMenuOpen(false)}>ATELIÊ</a>
      </nav>
      <a className="wordmark" href="#">VELOR<span>®</span></a>
      <div className="nav-right">
        <a className="account-link" href="#newsletter">JOURNAL</a>
        <button className="bag-button" onClick={() => setCartOpen(true)} aria-label="Abrir sacola"><ShoppingBag size={17}/><span>SACOLA ({cart.reduce((n, i) => n + i.qty, 0)})</span></button>
      </div>
    </header>

    <main>
      <section className="hero" ref={heroRef}>
        <div className="hero-image-wrap"><img className="hero-image" src="https://images.unsplash.com/photo-1539109197920-4a7c4f7b1b6f?auto=format&fit=crop&w=2200&q=90" alt="Editorial de moda VELOR" /></div>
        <div className="hero-shade"></div>
        <div className="hero-content">
          <p className="eyebrow hero-kicker">OBJECTS OF DESIRE · VOL. 01 / 2026</p>
          <h1><span className="hero-title-line">A DIFFERENT</span><span className="hero-title-line italic">FORM OF STYLE.</span></h1>
          <p className="hero-copy">Menos ruído. Mais presença.<br/>Uma nova perspectiva sobre o essencial.</p>
          <div className="hero-actions"><a className="button-light" href="#colecao">EXPLORAR COLEÇÃO <ArrowUpRight size={15}/></a><span className="hero-note">NOVA COLEÇÃO — 01/26</span></div>
        </div>
        <div className="hero-index"><span>01</span><i></i><span>04</span></div>
        <a href="#manifesto" className="scroll-cue"><ArrowDown size={14}/> SCROLL TO DISCOVER</a>
        <span className="hero-side-note">EST. MMXXVI — INDEPENDENT WARDROBE</span>
      </section>

      <section className="manifesto section-pad" id="manifesto">
        <div className="section-label reveal"><span>01 / NOSSA VISÃO</span><span>DESIGN WITH INTENTION</span></div>
        <div className="manifesto-grid">
          <h2 className="reveal">O essencial<br/>nunca é <em>simples.</em></h2>
          <div className="manifesto-text reveal"><p>Uma peça não precisa chamar atenção para ser lembrada. A VELOR nasce do encontro entre forma, matéria e atitude — roupas pensadas para acompanhar quem escolhe seu próprio caminho.</p><a className="text-link" href="#atelier">CONHEÇA NOSSO OLHAR <ArrowUpRight size={15}/></a></div>
        </div>
        <div className="manifesto-image reveal"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=85" alt="Campanha editorial VELOR" /><span>FORM / FUNCTION / FEELING</span></div>
      </section>

      <section className="collection section-pad" id="colecao">
        <div className="collection-heading reveal"><div><p className="eyebrow">02 / SELEÇÃO ATUAL</p><h2>Considered<br/><em>essentials.</em></h2></div><p className="collection-intro">Peças de presença silenciosa.<br/>Feitas para permanecer.</p></div>
        <div className="product-grid">
          {products.map((product, index) => <article className="product-card reveal" key={product.id}>
            <div className="product-photo-wrap">
              <img src={product.image} alt={product.name} className="product-photo" loading="lazy"/>
              <span className="product-tag">{product.tag}</span>
              <button className="quick-add" onClick={() => addToCart(product)} aria-label={`Adicionar ${product.name}`}><Plus size={18}/></button>
              <span className="photo-index">0{index + 1}</span>
            </div>
            <div className="product-meta"><div><p>{product.category}</p><h3>{product.name}</h3></div><strong>{money(product.price)}</strong></div>
          </article>)}
        </div>
        <div className="collection-bottom"><span>04 OBJECTS / ENDLESS POSSIBILITIES</span><a href="#newsletter" className="text-link">VER TODA A COLEÇÃO <ArrowRight size={15}/></a></div>
      </section>

      <section className="campaign" id="atelier">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90" alt="Editorial de moda em ambiente urbano" loading="lazy"/>
        <div className="campaign-overlay"></div><div className="campaign-content reveal"><p className="eyebrow">03 / THE VELOR ATTITUDE</p><h2>Wear your<br/><em>own story.</em></h2><a href="#colecao" className="button-light">DESCUBRA A VELOR <ArrowUpRight size={15}/></a></div>
        <span className="campaign-caption">CAMPAIGN 001 — CITY IN MOTION</span>
      </section>

      <section className="newsletter section-pad" id="newsletter">
        <div className="section-label"><span>04 / STAY IN THE FRAME</span><span>VELOR JOURNAL</span></div>
        <div className="newsletter-inner"><h2>Entre no nosso<br/><em>universo.</em></h2><form onSubmit={e => {e.preventDefault(); alert('Obrigado por chegar mais perto da VELOR.');}}><label htmlFor="email">RECEBA NOVIDADES, EDITORIAIS E LANÇAMENTOS.</label><div className="email-field"><input id="email" type="email" placeholder="Seu melhor e-mail" required/><button type="submit" aria-label="Inscrever"><ArrowRight/></button></div></form></div>
      </section>
    </main>

    <footer className="footer"><a className="footer-logo" href="#">VELOR<span>®</span></a><span>INDEPENDENT WARDROBE — © 2026</span><div><a href="#colecao">INSTAGRAM <ArrowUpRight size={12}/></a><a href="#manifesto">CONTATO <ArrowUpRight size={12}/></a></div></footer>

    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>Sacola <span>({cart.length})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)}><X/></button></div>
      {cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={30}/><p>Sua sacola está vazia.</p><button className="text-link" onClick={() => setCartOpen(false)}>CONTINUAR EXPLORANDO <ArrowRight size={14}/></button></div> :
      <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name}/><div className="cart-item-info"><p>{item.category}</p><h3>{item.name}</h3><strong>{money(item.price)}</strong><div className="qty"><button onClick={() => changeQty(item.id, -1)}><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => changeQty(item.id, 1)}><Plus size={13}/></button></div></div></div>)}</div><div className="cart-total"><div><span>SUBTOTAL</span><strong>{money(total)}</strong></div><button className="checkout" onClick={() => alert('Integração de pagamento será configurada na próxima etapa.')}>FINALIZAR PEDIDO <ArrowUpRight size={16}/></button></div></>}
    </aside></div>}
  </>
}

createRoot(document.getElementById('root')).render(<App />)
