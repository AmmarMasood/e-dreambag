import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";

function BoxItemsSelection({
  open,
  setOpen,
  currentSelectType,
  setCurrentSelectType,
  addStuff,
  addDirect
}) {
  const [Clothing, setClothing] = useState({
    sportswear: 0,
    underwear: 0,
    jacket: 0,
    pants: 0,
    socks: 0,
    sweater: 0
  });

  const [Shoes, setShoes] = useState({
    shoes: 0,
    slippers: 0,
    casual: 0,
    boots: 0
  });

  const [Bags, setBags] = useState({
    handbags: 0,
    hobobags: 0,
    backpack: 0
  });

  const [Accessories, setAccessories] = useState({
    eyewears: 0,
    jewelries: 0,
    rings: 0,
    watches: 0,
    scarfs: 0
  });

  const [Cosmetics, setCosmetics] = useState({
    powders: 0,
    creams: 0,
    gels: 0,
    lipstick: 0
  });

  const [Electronics, setElectronics] = useState({
    phones: 0,
    laptops: 0,
    tablets: 0,
    smartwatches: 0,
    ipads: 0
  });

  const [Stationary, setStationary] = useState({
    books: 0,
    pencils: 0,
    pens: 0,
    journals: 0
  });
  const [Direct, setDirect] = useState("");
  const handleClick = () => {
    setOpen(false);
    setCurrentSelectType("");
    setClothing({
      sportswear: 0,
      underwear: 0,
      jacket: 0,
      pants: 0,
      socks: 0,
      sweater: 0
    });
    setShoes({
      shoes: 0,
      slippers: 0,
      casual: 0,
      boots: 0
    });
    setBags({
      handbags: 0,
      hobobags: 0,
      backpack: 0
    });
    setAccessories({
      eyewears: 0,
      jewelries: 0,
      rings: 0,
      watches: 0,
      scarfs: 0
    });
    setCosmetics({
      powders: 0,
      creams: 0,
      gels: 0,
      lipstick: 0
    });
    setElectronics({
      phones: 0,
      laptops: 0,
      tablets: 0,
      smartwatches: 0,
      ipads: 0
    });
    setStationary({
      books: 0,
      pencils: 0,
      pens: 0,
      journals: 0
    });
    setDirect("");
  };

  const handleAdd = () => {
    if (currentSelectType === "clothing") {
      addStuff(currentSelectType, Clothing);
    }
    if (currentSelectType === "shoes") {
      addStuff(currentSelectType, Shoes);
    }
    if (currentSelectType === "bags") {
      addStuff(currentSelectType, Bags);
    }
    if (currentSelectType === "Accessories") {
      addStuff(currentSelectType, Accessories);
    }
    if (currentSelectType === "Cosmetics") {
      addStuff(currentSelectType, Cosmetics);
    }
    if (currentSelectType === "Electronics") {
      addStuff(currentSelectType, Electronics);
    }
    if (currentSelectType === "Stationary") {
      addStuff(currentSelectType, Stationary);
    }
    if (currentSelectType === "Direct") {
      addDirect(Direct);
    }

    handleClick();
  };

  // books: 0,
  // pencils: 0,
  // pens: 0,
  // journals: 0

  const directStuff = () => (
    <div className={`main-box-manangement-stuff--content-direct`}>
      <div>Please enter comma seprated values:</div>
      <div>
        <div>Value</div>
        <TextField
          style={{ width: "100%" }}
          value={Direct.value}
          onChange={e => setDirect(e.target.value)}
        />
      </div>
    </div>
  );
  const stationaryStuff = () => (
    <div className={`main-box-manangement-stuff--content-clothing`}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setStationary(prevState => ({
            ...prevState,
            ["books"]: prevState.books + 1
          }))
        }
      >
        Books
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Stationary.books}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setStationary(prevState => ({
            ...prevState,
            ["pencils"]: prevState.pencils + 1
          }))
        }
      >
        Pencils
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Stationary.pencils}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setStationary(prevState => ({
            ...prevState,
            ["pens"]: prevState.pens + 1
          }))
        }
      >
        Pens
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Stationary.pens}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setStationary(prevState => ({
            ...prevState,
            ["journals"]: prevState.journals + 1
          }))
        }
      >
        Journals
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Stationary.journals}
        </div>
      </Button>
    </div>
  );

  const electronicsStuff = () => (
    <div className={`main-box-manangement-stuff--content-clothing`}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setElectronics(prevState => ({
            ...prevState,
            ["ipads"]: prevState.ipads + 1
          }))
        }
      >
        Ipads
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Electronics.ipads}
        </div>
      </Button>

      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setElectronics(prevState => ({
            ...prevState,
            ["smartwatches"]: prevState.smartwatches + 1
          }))
        }
      >
        Smart Watches
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Electronics.smartwatches}
        </div>
      </Button>

      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setElectronics(prevState => ({
            ...prevState,
            ["tablets"]: prevState.tablets + 1
          }))
        }
      >
        Tablets
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Electronics.tablets}
        </div>
      </Button>

      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setElectronics(prevState => ({
            ...prevState,
            ["laptops"]: prevState.laptops + 1
          }))
        }
      >
        Laptops
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Electronics.laptops}
        </div>
      </Button>

      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setElectronics(prevState => ({
            ...prevState,
            ["phones"]: prevState.phones + 1
          }))
        }
      >
        Phones
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Electronics.phones}
        </div>
      </Button>
    </div>
  );

  const clothingStuff = () => (
    <div className={`main-box-manangement-stuff--content-${currentSelectType}`}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setClothing(prevState => ({
            ...prevState,
            ["sportswear"]: prevState.sportswear + 1
          }))
        }
      >
        Sportswear
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Clothing.sportswear}
        </div>
      </Button>

      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setClothing(prevState => ({
            ...prevState,
            ["underwear"]: prevState.underwear + 1
          }))
        }
      >
        Underwear
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Clothing.underwear}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setClothing(prevState => ({
            ...prevState,
            ["jacket"]: prevState.jacket + 1
          }))
        }
      >
        Jacket
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Clothing.jacket}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setClothing(prevState => ({
            ...prevState,
            ["pants"]: prevState.pants + 1
          }))
        }
      >
        Pants
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Clothing.pants}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setClothing(prevState => ({
            ...prevState,
            ["socks"]: prevState.socks + 1
          }))
        }
      >
        Socks
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Clothing.socks}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setClothing(prevState => ({
            ...prevState,
            ["sweater"]: prevState.sweater + 1
          }))
        }
      >
        Sweater
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Clothing.sweater}
        </div>
      </Button>
    </div>
  );

  const shoesStuff = () => (
    <div className={`main-box-manangement-stuff--content-clothing`}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setShoes(prevState => ({
            ...prevState,
            ["shoes"]: prevState.shoes + 1
          }))
        }
      >
        Shoes
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Shoes.shoes}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setShoes(prevState => ({
            ...prevState,
            ["slippers"]: prevState.slippers + 1
          }))
        }
      >
        Slippers
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Shoes.slippers}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setShoes(prevState => ({
            ...prevState,
            ["casual"]: prevState.casual + 1
          }))
        }
      >
        Casual
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Shoes.casual}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setShoes(prevState => ({
            ...prevState,
            ["boots"]: prevState.boots + 1
          }))
        }
      >
        Boots
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Shoes.boots}
        </div>
      </Button>
    </div>
  );

  const bagsStuff = () => (
    <div className={`main-box-manangement-stuff--content-clothing`}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setBags(prevState => ({
            ...prevState,
            ["handbags"]: prevState.handbags + 1
          }))
        }
      >
        Handbags
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Bags.handbags}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setBags(prevState => ({
            ...prevState,
            ["hobobags"]: prevState.hobobags + 1
          }))
        }
      >
        Hobobags
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Bags.hobobags}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setBags(prevState => ({
            ...prevState,
            ["backpack"]: prevState.backpack + 1
          }))
        }
      >
        Backpack
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Bags.backpack}
        </div>
      </Button>
    </div>
  );

  const AccessoriesStuff = () => (
    <div className={`main-box-manangement-stuff--content-clothing`}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setAccessories(prevState => ({
            ...prevState,
            ["watches"]: prevState.watches + 1
          }))
        }
      >
        Watches
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Accessories.watches}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setAccessories(prevState => ({
            ...prevState,
            ["jewelries"]: prevState.jewelries + 1
          }))
        }
      >
        Jewelries
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Accessories.jewelries}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setAccessories(prevState => ({
            ...prevState,
            ["rings"]: prevState.rings + 1
          }))
        }
      >
        Rings
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Accessories.rings}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setAccessories(prevState => ({
            ...prevState,
            ["scarfs"]: prevState.scarfs + 1
          }))
        }
      >
        Scarfs
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Accessories.scarfs}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setAccessories(prevState => ({
            ...prevState,
            ["eyewears"]: prevState.eyewears + 1
          }))
        }
      >
        Eyewears
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Accessories.eyewears}
        </div>
      </Button>
    </div>
  );

  const CosmeticsStuff = () => (
    <div className={`main-box-manangement-stuff--content-clothing`}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setCosmetics(prevState => ({
            ...prevState,
            ["lipstick"]: prevState.lipstick + 1
          }))
        }
      >
        Lipstick
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Cosmetics.lipstick}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setCosmetics(prevState => ({
            ...prevState,
            ["powders"]: prevState.powders + 1
          }))
        }
      >
        Powders
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Cosmetics.powders}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setCosmetics(prevState => ({
            ...prevState,
            ["gels"]: prevState.gels + 1
          }))
        }
      >
        Gels
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Cosmetics.gels}
        </div>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() =>
          setCosmetics(prevState => ({
            ...prevState,
            ["creams"]: prevState.creams + 1
          }))
        }
      >
        Creams
        <div
          style={{
            padding: "5px 10px 5px 10px"
          }}
        >
          {Cosmetics.creams}
        </div>
      </Button>
    </div>
  );

  const getStuff = () => {
    if (currentSelectType === "clothing") {
      return clothingStuff();
    }
    if (currentSelectType === "shoes") {
      return shoesStuff();
    }
    if (currentSelectType === "bags") {
      return bagsStuff();
    }
    if (currentSelectType === "Accessories") {
      return AccessoriesStuff();
    }
    if (currentSelectType === "Cosmetics") {
      return CosmeticsStuff();
    }
    if (currentSelectType === "Electronics") {
      return electronicsStuff();
    }
    if (currentSelectType === "Stationary") {
      return stationaryStuff();
    }
    if (currentSelectType === "Direct") {
      return directStuff();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"lg"}
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">
          {`Select ${currentSelectType} items`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {getStuff()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleAdd();
            }}
            color="primary"
            autoFocus
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BoxItemsSelection;
