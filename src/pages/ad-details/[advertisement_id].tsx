// pages/item-details/[item_id].tsx

import Image from "next/image";
import { ChevronLeft, PlusCircle, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GetServerSideProps } from "next";
import { api } from "@/services/api/api";
import { parseCookies } from "nookies";
import { Item } from "@/types/item";
import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "@/components/ui/extension/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Form, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the props for the component
interface AdDetailsProps {
  item: Item;
}

// Fetch data on the server side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { advertisement_id } = context.params!;
  const { auth } = parseCookies(context);
  console.log("context auth", auth);

  api.defaults.headers["Authorization"] = `Bearer ${auth}`;
  const res = await api.get(`/ad/${advertisement_id}`);
  const item = await res.data;

  console.log("item", item);

  // Return the item data as props
  return {
    props: {
      item,
    },
  };
};

export default function AdDetails({ item }: AdDetailsProps) {
  const schema = z.object({
    question: z.string(),
  });

  type Schema = z.infer<typeof schema>;

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      question: "",
    },
  });

  console.log("item", item);
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {item.name}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            In stock
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              {/* <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader> */}
              <CardContent>
                <Carousel
                  orientation="vertical"
                  className="flex items-center gap-2"
                >
                  <div className="relative  basis-3/4">
                    <CarouselMainContainer className="h-72">
                      {item.images.map((item, index) => (
                        <SliderMainItem
                          key={index}
                          className="border border-muted flex items-center justify-center h-52 rounded-md"
                        >
                          <Image
                            src={item.imageUrl}
                            alt="ad image"
                            width={1000}
                            height={1000}
                          />
                        </SliderMainItem>
                      ))}
                    </CarouselMainContainer>
                  </div>
                  <CarouselThumbsContainer className="basis-1/4">
                    {item.images.map((item, index) => (
                      <SliderThumbItem
                        key={index}
                        index={index}
                        className="rounded-md bg-transparent"
                      >
                        <Image
                          width={200}
                          height={200}
                          className="w-full h-full"
                          src={item.imageUrl}
                          alt="ad image"
                        />
                      </SliderThumbItem>
                    ))}
                  </CarouselThumbsContainer>
                </Carousel>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">SKU</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="w-[100px]">Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {item.availableOptions.map((variant, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">
                          {variant.name}
                        </TableCell>
                        <TableCell>
                          <Label htmlFor={`stock-${index}`} className="sr-only">
                            Stock
                          </Label>
                          <Input
                            id={`stock-${index}`}
                            type="number"
                            defaultValue={"1"}
                          />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor={`price-${index}`} className="sr-only">
                            AdditionalPrice Price
                          </Label>
                          <Input
                            id={`price-${index}`}
                            type="number"
                            defaultValue={variant.additionalPrice}
                          />
                        </TableCell>
                        {/* <TableCell>
                          <ToggleGroup
                            type="single"
                            defaultValue={variant.size}
                            variant="outline"
                          >
                            <ToggleGroupItem value="s">S</ToggleGroupItem>
                            <ToggleGroupItem value="m">M</ToggleGroupItem>
                            <ToggleGroupItem value="l">L</ToggleGroupItem>
                          </ToggleGroup>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button size="sm" variant="ghost" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Variant
                </Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue={item.gameId}>
                      <SelectTrigger id="category" aria-label="Select category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subcategory">Subcategory (optional)</Label>
                    <Select defaultValue={"item.subcategory"}>
                      <SelectTrigger
                        id="subcategory"
                        aria-label="Select subcategory"
                      >
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t-shirts">T-Shirts</SelectItem>
                        <SelectItem value="hoodies">Hoodies</SelectItem>
                        <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={"Draft"}>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src={item.images?.[0]?.imageUrl || "/placeholder.svg"}
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {item.images?.slice(1)?.map((image, index) => (
                      <button key={index}>
                        <Image
                          alt={`Product image ${index + 1}`}
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src={image.imageUrl || "/placeholder.svg"}
                          width="84"
                        />
                      </button>
                    ))}
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button size="sm" variant="secondary">
                  Archive Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/5 pt-6">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
              <h1 className="text-3xl font-semibold">Perguntas e Respostas</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
              <div className="grid gap-6">
                <Form {...form}>
                  <FormDescription>Pergunte ao vendedor</FormDescription>
                  <div className="flex gap-2">
                    <Textarea
                      {...form.register("question")}
                      placeholder="Escreva sua pergunta..."
                    />
                    <Button variant="default">Enviar Pergunta</Button>
                  </div>
                </Form>
                <Card x-chunk="dashboard-04-chunk-1">
                  {item.questions?.map((question) => {
                    return (
                      <>
                        <CardHeader>
                          <CardTitle>{question.user.name}</CardTitle>
                          <CardDescription>{question.question}</CardDescription>
                        </CardHeader>
                      </>
                    );
                  })}
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
