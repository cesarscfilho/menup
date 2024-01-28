'use client'

import { ArchiveIcon } from '@radix-ui/react-icons'
import {
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Search,
  Trash2,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import { Container } from '@/components/container'

import { mails } from './data'
import { MailList } from './mail'

export default function StoreOrdersClientPage({ defaultLayout = [620, 400] }) {
  return (
    <Container className="px-0 md:max-w-7xl">
      <ResizablePanelGroup
        className="h-[calc(100vh-120px)] items-stretch"
        direction="horizontal"
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>

          <MailList items={mails.filter((item) => !item.read)} />
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel
          className="hidden md:block"
          defaultSize={defaultLayout[1]}
          minSize={30}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center p-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <ArchiveIcon className="size-4" />
                  <span className="sr-only">Archive</span>
                </Button>

                <Button variant="ghost" size="icon">
                  <ArchiveX className="size-4" />
                  <span className="sr-only">Move to junk</span>
                </Button>

                <Button variant="ghost" size="icon">
                  <Trash2 className="size-4" />
                  <span className="sr-only">Move to trash</span>
                </Button>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Clock className="size-4" />
                      <span className="sr-only">Snooze</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-[535px] p-0">
                    <div className="flex flex-col gap-2 border-r px-2 py-4">
                      <div className="px-4 text-sm font-medium">
                        Snooze until
                      </div>
                      <div className="grid min-w-[250px] gap-1">
                        <Button
                          variant="ghost"
                          className="justify-start font-normal"
                        >
                          Later today{' '}
                          <span className="ml-auto text-muted-foreground"></span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start font-normal"
                        >
                          Tomorrow
                          <span className="ml-auto text-muted-foreground"></span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start font-normal"
                        >
                          This weekend
                          <span className="ml-auto text-muted-foreground"></span>
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start font-normal"
                        >
                          Next week
                          <span className="ml-auto text-muted-foreground"></span>
                        </Button>
                      </div>
                    </div>
                    <div className="p-2">
                      <Calendar />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Reply className="size-4" />
                  <span className="sr-only">Reply</span>
                </Button>

                <Button variant="ghost" size="icon">
                  <ReplyAll className="size-4" />
                  <span className="sr-only">Reply all</span>
                </Button>

                <Button variant="ghost" size="icon">
                  <Forward className="size-4" />
                  <span className="sr-only">Forward</span>
                </Button>
              </div>
              <Separator orientation="vertical" className="mx-2 h-6" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="size-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                  <DropdownMenuItem>Star thread</DropdownMenuItem>
                  <DropdownMenuItem>Add label</DropdownMenuItem>
                  <DropdownMenuItem>Mute thread</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Separator />

            <div className="flex flex-1 flex-col">
              <div className="flex items-start p-4">
                <div className="flex items-start gap-4 text-sm">
                  <Avatar>
                    <AvatarImage alt={'32'} />
                    <AvatarFallback>cn</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-semibold">Cesar</div>
                    <div className="line-clamp-1 text-xs">cesar</div>
                    <div className="line-clamp-1 text-xs">
                      <span className="font-medium">Reply-To:</span>
                      cesar@cesar.com
                    </div>
                  </div>
                </div>

                <div className="ml-auto text-xs text-muted-foreground">
                  DATE
                </div>
              </div>
              <Separator />
              <div className="flex-1 whitespace-pre-wrap p-4 text-sm"></div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Container>
  )
}
