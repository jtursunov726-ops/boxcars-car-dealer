import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import InnerLayout from './InnerLayout'
import Icon from '../components/Icon'
import { PostCard, NotifyForm } from '../components/sections'
import { posts, blogCategories, blogTags } from '../data/content'
import { img, people } from '../data/images'
import NotFound from './NotFound'
import { t } from '../i18n'

function Pagination({ pages, page, setPage }) {
  if (pages < 2) return null
  return (
    <div className="pagination">
      {Array.from({ length: pages }, (_, i) => <button key={i} type="button" className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>)}
      <button type="button" aria-label={t('Next page')} onClick={() => setPage(page % pages + 1)}><Icon name="chev-r" /></button>
    </div>
  )
}

/** Blog v1 – 3×3 grid */
export function BlogGrid() {
  const [page, setPage] = useState(1)
  const all = [...posts, ...posts.slice(0, 3)]
  const shown = all.slice((page - 1) * 9, page * 9)
  return (
    <InnerLayout title={t('Blog')} crumbs={[['Blog']]}>
      <div className="container">
        <div className="posts grid-3">{shown.map((p, i) => <PostCard key={p.id + i} post={p} />)}</div>
        <Pagination pages={Math.ceil(all.length / 9)} page={page} setPage={setPage} />
      </div>
    </InnerLayout>
  )
}

/** Blog v2 – list with sidebar */
export function BlogList() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('category')
  const list = cat ? posts.filter((p) => p.category === cat) : posts
  return (
    <InnerLayout title={t('Blog')} crumbs={[['Blog']]}>
      <div className="container blog-layout">
        <div className="blog-list">
          {list.length === 0 && <p>{t('No posts in this category yet.')}</p>}
          {list.map((p) => (
            <article key={p.id} className="post-row">
              <Link to={`/blog/${p.id}`} className="post-img big"><img src={p.image.replace('w=900', 'w=1400')} alt="" loading="lazy" /><span className="chip">{p.category}</span></Link>
              <p className="post-meta">{t(p.author)} <i /> {t(p.date)}</p>
              <h2><Link to={`/blog/${p.id}`}>{t(p.title)}</Link></h2>
              <p>{p.excerpt}</p>
              <Link to={`/blog/${p.id}`} className="arrow-link">{t('Read More')} <Icon name="arrow" /></Link>
            </article>
          ))}
        </div>
        <aside className="blog-side">
          <div className="side-card">
            <h4>{t('Categories')}</h4>
            {blogCategories.map((c) => (
              <button key={c} type="button" className={`side-link ${cat === c ? 'active' : ''}`} onClick={() => setParams(cat === c ? {} : { category: c })}>{t(c)}</button>
            ))}
          </div>
          <div className="side-card">
            <h4>{t('Tags')}</h4>
            <div className="tag-list">{blogTags.map((tag) => <button key={tag} type="button" className="tag" onClick={() => setParams({ category: tag === 'Fuel System' ? 'Fuel Systems' : tag })}>{t(tag)}</button>)}</div>
          </div>
        </aside>
      </div>
    </InnerLayout>
  )
}

const learn = ['Become a UX designer.', 'You will be able to start earning money Figma skills.', 'Build a UX project from beginning to end.', 'Work with colors & fonts.', 'You will create your own UX app.', 'Build & test a complete mobile app.', 'Learn to design mobile apps & websites.', 'Design 3 different logos.', 'Create low-fidelity wireframe.', 'Downloadable exercise files.']

export function BlogDetails() {
  const { id } = useParams()
  const index = posts.findIndex((p) => p.id === id)
  const post = posts[index]
  if (!post) return <NotFound />
  const prev = posts[(index - 1 + posts.length) % posts.length]
  const next = posts[(index + 1) % posts.length]
  return (
    <InnerLayout docTitle={post.title}>
      <div className="container">
        <p className="breadcrumb"><Link to="/">{t('Home')}</Link> / <Link to={`/blog/list?category=${post.category}`}>{post.category}</Link></p>
        <h1 className="page-title">{t(post.title)}</h1>
        <p className="post-meta author"><img src={img(people.jerome2, 60, 60)} alt="" /> {t(post.author)} <i /> {t(post.category)}, {t("Exterior")} <i /> {t(post.date)}</p>
        <img src={post.image.replace('w=900', 'w=1600')} alt="" className="article-hero" />
      </div>
      <article className="container narrow article">
        <p>{t('Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus sollicitudin cursus. Ut et adipiscing erat. Curabitur this is a text link libero tempus congue.')}</p>
        <p>{t('Duis mattis laoreet neque, et ornare neque sollicitudin at. Proin sagittis dolor sed mi elementum pretium. Donec et justo ante. Vivamus egestas sodales est, eu rhoncus urna semper eu. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer tristique elit lobortis purus bibendum, quis dictum metus mattis. Phasellus posuere felis sed eros porttitor mattis. Curabitur massa magna, tempor in blandit id, porta in ligula. Aliquam laoreet nisl massa, at interdum mauris sollicitudin et.')}</p>
        <blockquote className="quote">
          <p>{t('Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.')}</p>
          <cite>{t('Luis Pickford')}</cite>
        </blockquote>
        <h3>{t("What you'll learn")}</h3>
        <ul className="learn">{learn.map((l) => <li key={l}><Icon name="check" /> {t(l)}</li>)}</ul>
        <img src={next.image.replace('w=900', 'w=1200')} alt="" className="article-img" />
        <h3>{t('Requirements')}</h3>
        <ul className="bullets">
          <li>{t('We do not require any previous experience or pre-defined skills to take this course. A great orientation would be enough to master UI/UX design.')}</li>
          <li>{t('A computer with a good internet connection.')}</li>
          <li>{t('Adobe Photoshop (OPTIONAL)')}</li>
        </ul>
        <div className="share-row">
          <span>{t('Share this post')} <a href="https://facebook.com" aria-label={t('Facebook')}><Icon name="fb" /></a><a href="https://twitter.com" aria-label={t('Twitter')}><Icon name="tw" /></a><a href="https://linkedin.com" aria-label={t('LinkedIn')}><Icon name="in" /></a><a href="https://pinterest.com" aria-label={t('Pinterest')}><Icon name="pinterest" /></a></span>
          <span className="tag-list">{['Exterior', 'Fuel System', 'Sound'].map((tag) => <Link key={tag} className="tag" to={`/blog/list?category=${tag === 'Fuel System' ? 'Fuel Systems' : tag}`}>{t(tag)}</Link>)}</span>
        </div>
        <div className="author-box">
          <img src={img(people.jerome2, 140, 140)} alt="" />
          <div><h4>{t('Admin')}</h4><p>{t('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.')}</p></div>
        </div>
        <div className="prev-next">
          <Link to={`/blog/${prev.id}`}><small><Icon name="chev-l" /> {t('Previous Post')}</small>{prev.title}</Link>
          <Link to={`/blog/${next.id}`} className="right"><small>{t('Next Post')} <Icon name="chev-r" /></small>{next.title}</Link>
        </div>
        <h3>{t('3 Comments')}</h3>
        {['Admin', 'Floyd Miles', 'Jenny Wilson'].map((n, i) => (
          <div key={n} className="comment">
            <div className="comment-head"><img src={img([people.jerome2, people.floyd, people.jenny][i], 80, 80)} alt="" /><b>{n}</b><small>{t('November 25, 2023')}</small><button type="button" className="link-btn reply">{t('Reply')}</button></div>
            <p>{t('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.')}</p>
          </div>
        ))}
        <h3>{t('Leave a Comment')}</h3>
        <NotifyForm className="form-grid" message={t('Thanks! Your comment is awaiting moderation.')}>
          <label className="field"><span>{t('Name')}</span><input required placeholder={t('Ali')} /></label>
          <label className="field"><span>{t('Email')}</span><input type="email" required placeholder={t('example@gmail.com')} /></label>
          <label className="field full"><span>{t('Comment')}</span><textarea rows="6" required /></label>
          <button type="submit" className="btn btn-primary">{t('Post Comment')} <Icon name="arrow" /></button>
        </NotifyForm>
      </article>
    </InnerLayout>
  )
}
