interface LookbookImageProps {
  image?: string;
  number?: string;
  caption: string;
  className?: string;
}

const LookbookImage = ({
  image,
  number,
  caption,
  className = "",
}: LookbookImageProps) => {
  return (
    <div className={`lookbook-image ${className}`}>

      {/* IMAGE / PLACEHOLDER */}
      {image ? (
        <img
          src={image}
          alt="PIXEL lookbook"
        />
      ) : (
        <div className="lookbook-placeholder">
          <span>IMAGE HERE</span>
        </div>
      )}

      {/* IMAGE NUMBER */}
      {number && (
        <div className="lookbook-number">
          {number}
        </div>
      )}

      {/* IMAGE CAPTION */}
      <div className="lookbook-caption">
        {caption}
      </div>

    </div>
  );
};

export default LookbookImage;