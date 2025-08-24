import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function SEO({
  title = 'Pedro Morato | Desenvolvedor Independente',
  description = 'Portfólio de Pedro Morato Lahoz - Desenvolvedor Independente. Confira meus projetos, habilidades e experiência em desenvolvimento web.',
  keywords = 'Pedro Morato, Pedro Morato Lahoz, Desenvolvedor Independente, Portfólio, Desenvolvedor Web, Programador, Front-end, Back-end, React, TypeScript, Node.js',
  image = 'https://pedromorato.com/og-image.jpg',
  url = 'https://pedromorato.com',
  type = 'website',
}: SEOProps) {
  const siteName = 'Pedro Morato - Portfólio';
  const fullTitle = title.includes('Pedro Morato') ? title : `${title} | Pedro Morato`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Pedro Morato Lahoz" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@seu_twitter" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
