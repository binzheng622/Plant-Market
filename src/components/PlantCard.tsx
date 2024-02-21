const PlantCard = ({
  plantId,
  plantName,
  image,
  sunInfo,
  waterInfo,
  deletePlant,
}: {
  plantId: string;
  plantName: string;
  image: string;
  sunInfo: string;
  waterInfo: string;
  deletePlant: (plantId: string) => void;
}) => {
  return (
    <div className='outerCard'>
      <div className='plantCard'>
        <div className='plantCardHead'>
          <h3 className='plantCardName'>{plantName}</h3>
          <button
            className='plantCardButton'
            onClick={() => deletePlant(plantId)}
          >
            <img
              className='deleteCard'
              src='https://cdn2.iconfinder.com/data/icons/media-controls-5/100/close-512.png'
              alt='delete'
            />
          </button>
        </div>
        <img className='plantCardImg' src={image} alt='plant image' />
        <p className='plantCardTitle'>
          Sun Pref: <span className='plantCardInfo'>{sunInfo}</span>
        </p>
        <p className='plantCardTitle'>
          Water Maint: <span className='plantCardInfo'>{waterInfo}</span>
        </p>
      </div>
    </div>
  );
};

export default PlantCard;
