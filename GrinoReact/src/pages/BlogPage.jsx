export default function BlogPage() {
  const newsCards = [
    [
      "images/orange-slices.webp",
      "orange-slices",
      "4",
      "MAR",
      "85 Comments",
      "Experience the refreshing taste of fresh citrusto energize your day naturally.",
    ],
    [
      "images/cooked-egg.webp",
      "cooked-egg",
      "18",
      "JAN",
      "49 Comments",
      "combination of avocado and eggs, creating the perfect balanced breakfast",
    ],
    [
      "images/salad.webp",
      "salad",
      "11",
      "SEP",
      "65 Comments",
      "A colorful mix of fresh vegetables crafted into a nourishing salad bowl",
    ],
  ];

  return (
    <>
      <section id="blog" className="latest-cover">
        <img
          className="latest-cover-leaf1 leaf"
          src="images/leaf.webp"
          alt="leaf3"
        />
        <img
          className="latest-cover-leaf2 leaf"
          src="images/leaf.webp"
          alt="leaf3"
        />
        <img
          className="latest-cover-leaf3 leaf"
          src="images/leaf.webp"
          alt="leaf3"
        />
        <div className="latest-news">
          <h3 className="blog-title" id="blog-title">
            Blog
          </h3>
          <h1 className="latest-news-title">Latest News</h1>
          <div className="latest-news-cards-container">
            {newsCards.map(([image, alt, day, month, comments, content]) => (
              <div className="latest-news-card" key={image}>
                <div className="latest-news-card-image-container">
                  <img
                    className="latest-news-card-image"
                    src={image}
                    alt={alt}
                  />
                  <div className="news-date">
                    <h1>{day}</h1>
                    <p>{month}</p>
                  </div>
                </div>
                <div className="latest-news-card-info">
                  <div className="latest-news-card-info-desc">
                    <div className="latest-news-card-info-title">
                      <span className="latest-news-card-info-desc-category">
                        <i className="ri-price-tag-3-line"></i> Food
                      </span>
                      <span className="latest-news-card-info-desc-user">
                        <i className="ri-user-line"></i> By Admin
                      </span>
                      <span className="latest-news-card-info-desc-comments">
                        <i className="ri-chat-2-line"></i> {comments}
                      </span>
                    </div>
                    <p className="latest-news-card-info-content">{content}</p>
                  </div>
                  <button className="latest-news-card-info-btn">
                    Read More &nbsp; <i className="fas fa-arrow-right-long"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
