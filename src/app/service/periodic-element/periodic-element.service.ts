import {Injectable} from "@angular/core";
import {PeriodicElement} from "../../model/periodic-element/periodic-element.model";
import {Observable, of} from "rxjs";
import {Page} from "../../model/page/page.model";

@Injectable({
  providedIn: 'root'
})
export class PeriodicElementService {

  constructor() {
    for (let i = 1; i <= 95; i++) {
      this.periodicElementList.push({
        name: 'Element' + i,
        weight: i,
        symbol: 'E' + i,
        description: 'Description for element ' + i,
      });
    }
  }

  getPage(pageNumber: number, elementsOnPage: number): Observable<Page> {
    let page: Page = {
      currentPage: pageNumber,
      pageSize: elementsOnPage,
      numberOfElements: this.periodicElementList.length,
      elements: this.periodicElementList.slice(pageNumber * elementsOnPage, pageNumber * elementsOnPage + elementsOnPage)
    };

    return of(page);
  }

  searchElement(filter: string, pageNumber: number, elementsOnPage: number): Observable<Page> {
    let filteredList = this.periodicElementList
      .filter(element => element.name.toUpperCase().includes(filter.toUpperCase()) ||
        element.symbol.toUpperCase().includes(filter.toUpperCase()) ||
        element.description.toUpperCase().includes(filter.toUpperCase()) ||
        element.weight.toString().toUpperCase().includes(filter.toUpperCase()));

    let page: Page = {
      currentPage: pageNumber,
      pageSize: elementsOnPage,
      numberOfElements: filteredList.length,
      elements: filteredList.slice(pageNumber * elementsOnPage, pageNumber * elementsOnPage + elementsOnPage)
    };

    return of(page);
  }

  addElement(item: any) {
    this.periodicElementList.push(item);
  }

  editElement(item: any, newItem: any) {
    const index = this.periodicElementList.findIndex(element => element == item);
    if (index !== -1) {
      this.periodicElementList[index] = newItem;
    }
  }

  deleteElement(item: any) {
    const index = this.periodicElementList.findIndex(element => element == item);
    if (index !== -1) {
      this.periodicElementList.splice(index, 1);
    }
  }

  private periodicElementList: PeriodicElement[] = [
    {
      name: 'Hydrogen',
      weight: 1.0079,
      symbol: 'H',
      description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
    }, {
      name: 'Helium',
      weight: 4.0026,
      symbol: 'He',
      description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
    }, {
      name: 'Lithium',
      weight: 6.941,
      symbol: 'Li',
      description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
    }, {
      name: 'Beryllium',
      weight: 9.0122,
      symbol: 'Be',
      description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
    }, {
      name: 'Boron',
      weight: 10.811,
      symbol: 'B',
      description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
    }, {
      name: 'Carbon',
      weight: 12.0107,
      symbol: 'C',
      description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
    }, {
      name: 'Nitrogen',
      weight: 14.0067,
      symbol: 'N',
      description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
    }, {
      name: 'Oxygen',
      weight: 15.9994,
      symbol: 'O',
      description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
    }, {
      name: 'Fluorine',
      weight: 18.9984,
      symbol: 'F',
      description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
    }, {
      name: 'Neon',
      weight: 20.1797,
      symbol: 'Ne',
      description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
    },
    // Additional elements start here
    {
      name: 'Sodium',
      weight: 22.9897,
      symbol: 'Na',
      description: `Sodium is a chemical element with symbol Na and atomic number 11. It is a soft,
        silvery-white, highly reactive metal.`
    },
    {
      name: 'Magnesium',
      weight: 24.305,
      symbol: 'Mg',
      description: `Magnesium is a chemical element with symbol Mg and atomic number 12. It is a shiny
        gray solid which bears a close physical resemblance to the other five elements in the second
        column of the periodic table.`
    },
    {
      name: 'Aluminum',
      weight: 26.9815,
      symbol: 'Al',
      description: `Aluminum is a chemical element with symbol Al and atomic number 13. It is a silvery-
        white, soft, non-magnetic and ductile metal in the boron group.`
    },
    {
      name: 'Silicon',
      weight: 28.0855,
      symbol: 'Si',
      description: `Silicon is a chemical element with symbol Si and atomic number 14. It is a hard,
        brittle crystalline solid with a blue-grey metallic lustre, and is a tetravalent metalloid
        and semiconductor.`
    },
    {
      name: 'Phosphorus',
      weight: 30.9738,
      symbol: 'P',
      description: `Phosphorus is a chemical element with symbol P and atomic number 15. It is a
        multivalent nonmetal of the nitrogen group.`
    },
    {
      name: 'Sulfur',
      weight: 32.065,
      symbol: 'S',
      description: `Sulfur is a chemical element with symbol S and atomic number 16. It is abundant,
        multivalent and nonmetallic.`
    },
    {
      name: 'Chlorine',
      weight: 35.453,
      symbol: 'Cl',
      description: `Chlorine is a chemical element with symbol Cl and atomic number 17. It is in the
        halogen group.`
    },
    {
      name: 'Potassium',
      weight: 39.0983,
      symbol: 'K',
      description: `Potassium is a chemical element with symbol K and atomic number 19. It is a
        silvery-white metal that is soft enough to be cut with a knife with little force.`
    },
    {
      name: 'Calcium',
      weight: 40.078,
      symbol: 'Ca',
      description: `Calcium is a chemical element with symbol Ca and atomic number 20. It is a soft
        gray Group 2 alkaline earth metal.`
    },
    {
      name: 'Scandium',
      weight: 44.9559,
      symbol: 'Sc',
      description: `Scandium is a chemical element with symbol Sc and atomic number 21. It is a silvery-
        white metallic d-block element, it has historically been classified as a rare-earth element.`
    },
    {
      name: 'Titanium',
      weight: 47.867,
      symbol: 'Ti',
      description: `Titanium is a chemical element with symbol Ti and atomic number 22. It is a lustrous
        transition metal with a silver color, low density, and high strength.`
    },
    {
      name: 'Vanadium',
      weight: 50.9415,
      symbol: 'V',
      description: `Vanadium is a chemical element with symbol V and atomic number 23. It is a hard,
        silvery-grey, malleable transition metal.`
    },
    {
      name: 'Chromium',
      weight: 51.9961,
      symbol: 'Cr',
      description: `Chromium is a chemical element with symbol Cr and atomic number 24. It is a hard and
        shiny transition metal.`
    },
    {
      name: 'Manganese',
      weight: 54.938,
      symbol: 'Mn',
      description: `Manganese is a chemical element with symbol Mn and atomic number 25. It is not found
        as a free element in nature; it is often found in minerals in combination with iron.`
    },
    {
      name: 'Iron',
      weight: 55.845,
      symbol: 'Fe',
      description: `Iron is a chemical element with symbol Fe and atomic number 26. It is a metal that
        belongs to the first transition series and group 8 of the periodic table.`
    },
    {
      name: 'Cobalt',
      weight: 58.9332,
      symbol: 'Co',
      description: `Cobalt is a chemical element with symbol Co and atomic number 27. It is a hard,
        lustrous, silver-gray metal.`
    },
    {
      name: 'Nickel',
      weight: 58.6934,
      symbol: 'Ni',
      description: `Nickel is a chemical element with symbol Ni and atomic number 28. It is a silvery-
        white lustrous metal with a slight golden tinge.`
    },
    {
      name: 'Copper',
      weight: 63.546,
      symbol: 'Cu',
      description: `Copper is a chemical element with symbol Cu and atomic number 29. It is a soft,
        malleable, and ductile metal with very high thermal and electrical conductivity.`
    },
    {
      name: 'Zinc',
      weight: 65.38,
      symbol: 'Zn',
      description: `Zinc is a chemical element with symbol Zn and atomic number 30. It is a slightly
        brittle metal at room temperature and has a blue-silvery appearance when oxidation is removed.`
    },
    {
      name: 'Gallium',
      weight: 69.723,
      symbol: 'Ga',
      description: `Gallium is a chemical element with symbol Ga and atomic number 31. It is in group
        13 of the periodic table, and thus has similarities to the other metals of the group, aluminium,
        indium, and thallium.`
    },
    {
      name: 'Germanium',
      weight: 72.63,
      symbol: 'Ge',
      description: `Germanium is a chemical element with symbol Ge and atomic number 32. It is a
        lustrous, hard-brittle, grayish-white metalloid in the carbon group, chemically similar to its
        group neighbors tin and silicon.`
    },
    {
      name: 'Arsenic',
      weight: 74.9216,
      symbol: 'As',
      description: `Arsenic is a chemical element with symbol As and atomic number 33. It occurs in many
        minerals, usually in combination with sulfur and metals, but also as a pure elemental crystal.`
    },
    {
      name: 'Selenium',
      weight: 78.96,
      symbol: 'Se',
      description: `Selenium is a chemical element with symbol Se and atomic number 34. It is a
        nonmetal with properties that are intermediate between the elements above and below in the
        periodic table, sulfur and tellurium.`
    },
    {
      name: 'Bromine',
      weight: 79.904,
      symbol: 'Br',
      description: `Bromine is a chemical element with symbol Br and atomic number 35. It is the third-
        lightest halogen, and is a fuming red-brown liquid at room temperature that evaporates readily
        to form a similarly coloured gas.`
    },
    {
      name: 'Krypton',
      weight: 83.798,
      symbol: 'Kr',
      description: `Krypton is a chemical element with symbol Kr and atomic number 36. It is a member of
        group 18 (noble gases) elements.`
    },
    {
      name: 'Rubidium',
      weight: 85.4678,
      symbol: 'Rb',
      description: `Rubidium is a chemical element with symbol Rb and atomic number 37. Rubidium is a
        soft, silvery-white metallic element of the alkali metal group.`
    },
    {
      name: 'Strontium',
      weight: 87.62,
      symbol: 'Sr',
      description: `Strontium is a chemical element with symbol Sr and atomic number 38. An alkaline
        earth metal, strontium is a soft silver-white yellowish metallic element that is highly
        chemically reactive.`
    },
    {
      name: 'Yttrium',
      weight: 88.9058,
      symbol: 'Y',
      description: `Yttrium is a chemical element with symbol Y and atomic number 39. It is a silvery-
        metallic transition metal chemically similar to the lanthanides and has often been classified
        as a "rare-earth element".`
    },
    {
      name: 'Zirconium',
      weight: 91.224,
      symbol: 'Zr',
      description: `Zirconium is a chemical element with symbol Zr and atomic number 40. It is a lustrous,
        gray-white, strong transition metal that resembles hafnium and, to a lesser extent, titanium.`
    },
    {
      name: 'Niobium',
      weight: 92.9064,
      symbol: 'Nb',
      description: `Niobium is a chemical element with symbol Nb and atomic number 41. It is a soft,
        grey, ductile transition metal, often found in the minerals pyrochlore and columbite.`
    },
    {
      name: 'Molybdenum',
      weight: 95.94,
      symbol: 'Mo',
      description: `Molybdenum is a chemical element with symbol Mo and atomic number 42. The name is from
        Neo-Latin molybdaenum, from Ancient Greek Μόλυβδος molybdos, meaning lead, since its ores were
        confused with lead ores.`
    },
    {
      name: 'Technetium',
      weight: 98,
      symbol: 'Tc',
      description: `Technetium is a chemical element with symbol Tc and atomic number 43. It is the lightest
        element whose isotopes are all radioactive; none are stable, excluding the fully ionized state
        of 97Tc.`
    },
    {
      name: 'Ruthenium',
      weight: 101.07,
      symbol: 'Ru',
      description: `Ruthenium is a chemical element with symbol Ru and atomic number 44. It is a rare
        transition metal belonging to the platinum group of the periodic table.`
    },
    {
      name: 'Rhodium',
      weight: 102.9055,
      symbol: 'Rh',
      description: `Rhodium is a chemical element with symbol Rh and atomic number 45. It is a rare, silvery-
        white, hard, corrosion-resistant, and chemically inert transition metal.`
    },
    {
      name: 'Palladium',
      weight: 106.42,
      symbol: 'Pd',
      description: `Palladium is a chemical element with symbol Pd and atomic number 46. It is a rare and
        lustrous silvery-white metal discovered in 1803 by the English chemist William Hyde Wollaston.`
    },
    {
      name: 'Silver',
      weight: 107.8682,
      symbol: 'Ag',
      description: `Silver is a chemical element with symbol Ag and atomic number 47. A soft, white,
        lustrous transition metal, it exhibits the highest electrical conductivity, thermal conductivity,
        and reflectivity of any metal.`
    },
    {
      name: 'Cadmium',
      weight: 112.411,
      symbol: 'Cd',
      description: `Cadmium is a chemical element with symbol Cd and atomic number 48. It is a soft, bluish-
        white metal, and is easily cut with a knife.`
    },
    {
      name: 'Indium',
      weight: 114.818,
      symbol: 'In',
      description: `Indium is a chemical element with symbol In and atomic number 49. It is a post-transition
        metal that makes up 0.21 parts per million of the Earth's crust.`
    },
    {
      name: 'Tin',
      weight: 118.71,
      symbol: 'Sn',
      description: `Tin is a chemical element with symbol Sn and atomic number 50. Tin is a silvery metal
        that characteristically has a faint yellow hue.`
    }
  ];

}
