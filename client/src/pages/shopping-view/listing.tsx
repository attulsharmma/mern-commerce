import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowUpDownIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { IFilters } from "@/components/shopping-view/shopping-view.types";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadingProducts,
  setProductsData,
  setProductsError,
} from "@/redux/shop/product-slice";
import { apiWrapper } from "@/services/apiWrapper";
import { getAllFilteredProducts } from "@/services/shop/product/product.services";
import type { RootState } from "@/redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams: any) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    } else if (typeof value === "string" && value.trim() !== "") {
      queryParams.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const {
    products: { data: productList },
  } = useSelector((state: RootState) => state.shopProducts);
  const [filters, setFilters] = useState<IFilters>({});
  const [sort, setSort] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  function handleFilter(sectionId: string, currentOption: string) {
    console.log(sectionId, currentOption);
    let filtersCloned = { ...filters };
    const indexOfCurrentOption = Object.keys(filtersCloned).indexOf(sectionId);
    console.log(indexOfCurrentOption);
    if (indexOfCurrentOption === -1) {
      filtersCloned = {
        ...filtersCloned,
        [sectionId]: [currentOption],
      };
    } else {
      const indexOfCurrentOption =
        filtersCloned[sectionId].indexOf(currentOption);
      if (indexOfCurrentOption === -1) {
        filtersCloned[sectionId]?.push(currentOption);
      } else {
        filtersCloned[sectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(filtersCloned);

    sessionStorage.setItem("filters", JSON.stringify(filtersCloned));
  }
  function handleSort(value: string) {
    console.log({ value }, "sortVlaue");
    setSort(value);
    sessionStorage.setItem("sort", JSON.stringify(value));
  }
  const fetchProducts = useCallback(async () => {
    try {
      dispatch(setLoadingProducts(true));
      const result = await apiWrapper(
        () => getAllFilteredProducts(searchParams.toString()),
        {
          skipToast: true,
        }
      );

      if (result.data.success) {
        dispatch(setProductsData(result.data.data));
      } else {
        dispatch(setProductsError(true));
      }
    } catch (error) {
      dispatch(setProductsError(true));
      console.error(error);
    } finally {
      dispatch(setLoadingProducts(false));
    }
  }, [dispatch, searchParams]);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  useEffect(() => {
    setSort(JSON.parse(sessionStorage.getItem("sort") || ""));
    setFilters(JSON.parse(sessionStorage.getItem("filters") || "{}"));
  }, []);
  useEffect(() => {
    const query = createSearchParamsHelper({
      ...(filters && Object.keys(filters).length && filters),
      ...(sort && { sort: sort as string }),
    });
    console.log(query);
    setSearchParams(new URLSearchParams(query));
  }, [filters, sort]);
  console.log(searchParams.toString());
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort as string}
                  onValueChange={handleSort}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile product={productItem} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
