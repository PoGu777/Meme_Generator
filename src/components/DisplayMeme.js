function MemeDisplay(props) {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <img style={{ width: 400 }} src={props.meme} alt="custom meme" />
        </div>

        
      </div>
    );
}

export default MemeDisplay;