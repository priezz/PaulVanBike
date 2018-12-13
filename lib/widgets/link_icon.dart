import 'dart:io' show Platform;
import 'package:flutter/material.dart';
import 'package:icons_helper/icons_helper.dart';
import 'package:url_launcher/url_launcher.dart';

class LinkIcon extends StatelessWidget {
    final String link;
    final String type;
    final String icon;
    final String lat;
    final String lng;
    final Color color;
    LinkIcon({this.link, this.type, this.icon, this.lat, this.lng, this.color = Colors.white});

    @override
    Widget build(BuildContext context) => link == null ? Container() : Container(
        child: InkWell(
            child: Icon(getIconGuessFavorFA(name: icon), color: color,),
            onTap: ()async {
                String url = link;
                if(type == 'phone') url = 'tel:$link';
                if(type == 'map') {
                    /* Map URL schemas:
                        http://stackoverflow.com/a/34359246/3445280
                        https://developer.apple.com/library/content/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
                    */
                    String address = link.replaceAll(RegExp(r'\s+'), '+');
                    String coords = lat != null && lng != null ? '$lat,$lng' : '';
                    url = Platform.isIOS || Platform.isMacOS
                        ? 'maps:?sll=$coords&address=$address&daddr=$address&t=m'
                        : 'geo:$coords?q=$address';
                }
                if(await canLaunch(url)) await launch(url);
            },
        ),
        margin: EdgeInsets.only(left: 10),
        height: 36,
        width: 36,
    );
}
